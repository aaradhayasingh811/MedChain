const axios = require("axios");
const FormData = require("form-data");
const { decryptBuffer } = require("./encrypt");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";


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


/**
 * Download and decrypt file from IPFS
 */
async function downloadFromIPFS(cid, key) {
  try {
    const url = `${PINATA_GATEWAY}${cid}`;

    const res = await axios.get(url, { responseType: "arraybuffer" });
    // console.log("Downloaded data from IPFS:", res.data);
    const encryptedBuffer = Buffer.from(res.data);
    console.log("Encrypted buffer:", encryptedBuffer)

    // decrypt with your key
    const decryptedBuffer = decryptBuffer(encryptedBuffer, key);

    return decryptedBuffer;
  } catch (err) {
    console.error("Download from IPFS failed:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { uploadBuffer, downloadFromIPFS };


