const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { encryptBuffer } = require("../utils/encrypt");
const { uploadBuffer } = require("../utils/ipfs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { downloadFromIPFS } = require("../utils/ipfs");
// Gemini config
const config = {
  apiKey: process.env.GEMINI_API_KEY ,
  modelName: "gemini-2.0-flash",
  temperature: 0.7,
  maxTokens: 2048,
};

const genAI = new GoogleGenerativeAI(config.apiKey);
const model = genAI.getGenerativeModel({ model: config.modelName });

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Generate FHIR JSON using Gemini
const generateGeminiResponse = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};
async function convertToFHIR(filePath) {
  try {
    // Extract text from PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const rawText = pdfData.text;

    // Send extracted text to Gemini in JSON mode
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Convert the following medical report into a valid FHIR-compliant JSON Bundle. 
              Provide only JSON (no markdown, no explanations).\n\n${rawText}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json", 
      },
    });

    return result.response.text(); 
  } catch (error) {
    console.error("Error converting to FHIR:", error);
    throw error;
  }
}


const handlePdfUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../", req.file.path);

    // Convert PDF → FHIR JSON via Gemini
    const fhirData = await convertToFHIR(filePath);
    // console.log("FHIR Data:", fhirData);

    // Encrypt FHIR JSON
    const encryptedData = encryptBuffer(Buffer.from(fhirData), ENCRYPTION_KEY);
    console.log("Encypted data ", encryptedData)

    // Upload encrypted data to IPFS
    const cid = await uploadBuffer(encryptedData);

    // Remove uploaded PDF from server
    fs.unlinkSync(filePath);

    res.json({ cid, message: "PDF converted, encrypted, and uploaded to IPFS" });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};

const handleFileDownload = async (req, res) => {
  try {
    const { cid } = req.params;
    const decryptedBuffer = await downloadFromIPFS(cid, ENCRYPTION_KEY);

    // Set headers for a text file
    res.setHeader("Content-Disposition", `attachment; filename=${cid}.txt`);
    res.setHeader("Content-Type", "text/plain");

    res.send(decryptedBuffer);
  } catch (err) {
    console.error("Download Error:", err);
    res.status(500).json({ error: "Failed to download file" });
  }
};


module.exports = { handlePdfUpload, handleFileDownload };
