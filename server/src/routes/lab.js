const express = require("express");
const LabController = require("../controllers/LabController");
const { validateCreateLab, validateEditLab, validateDeleteLab } = require("../middleware/validate");
const { authenticate } = require("../middleware/authenticate");
const router = express.Router();

router.get("/labs", [LabController.getLabs]);
router.post("/create-lab", [authenticate, validateCreateLab, LabController.createLab]);
router.post("/edit-lab", [authenticate, validateEditLab, LabController.editLab]);
router.post("/delete-lab", [authenticate, validateDeleteLab, LabController.deleteLab]);

module.exports = router;
