const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; 

function encryptBuffer(buffer, key) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, "hex"), iv);

  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]); 
}


function decryptBuffer(encryptedBuffer, key) {
  const iv = encryptedBuffer.slice(0, IV_LENGTH);
  const encryptedData = encryptedBuffer.slice(IV_LENGTH);

  console.log("IV length:", iv.length);
  console.log("Encrypted data length:", encryptedData.length);
  console.log("Key length:", key.length);

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, "hex"), iv);
  let decrypted;
  try {
    decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  } catch (err) {
    console.error("Decryption failed:", err.message);
    throw err;
  }
  return decrypted;
}


module.exports = { encryptBuffer, decryptBuffer };
