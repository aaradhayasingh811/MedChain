const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { encryptBuffer } = require("../utils/encrypt");
const { convertToFHIR } = require("../utils/fhir");
const { uploadBuffer } = require("../utils/ipfs");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const handlePdfUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../", req.file.path);
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);
    const rawText = pdfData.text;

    const fhirData = convertToFHIR(rawText);
    const fhirJSON = JSON.stringify(fhirData);

    const encryptedFHIR = encryptBuffer(Buffer.from(fhirJSON), ENCRYPTION_KEY);

    const cid = await uploadBuffer(encryptedFHIR);

    fs.unlinkSync(filePath);
    res.json({ cid, message: "FHIR data encrypted and uploaded to Pinata (IPFS)" });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};

module.exports = { handlePdfUpload };
