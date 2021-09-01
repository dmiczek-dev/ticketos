const express = require("express");
const FileController = require("../controllers/FileController");
const router = express.Router();

router.post("/upload", FileController.upload);
router.get("/:advertId", FileController.getFilesByAdvertId);
router.get("/", FileController.getFilesList);
router.post("/delete", FileController.deleteFile);

module.exports = router;
