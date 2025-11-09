const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { handlePdfUpload , handleFileDownload} = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
// Upload & Convert PDF to FHIR → Encrypt → IPFS
``
const upload = multer({ storage });

router.post("/pdf-to-fhir", upload.single("file"), handlePdfUpload);
router.get("/download/:cid", handleFileDownload);

module.exports = router;
