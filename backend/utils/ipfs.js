const axios = require("axios");
const FormData = require("form-data");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

async function uploadBuffer(buffer, filename = "fhir.enc") {
  const data = new FormData();
  data.append("file", buffer, filename);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    headers: {
      ...data.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
  });

  return res.data.IpfsHash;
}

module.exports = { uploadBuffer };
