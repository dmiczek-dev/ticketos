const express = require("express");
const OfficeController = require("../controllers/OfficeController");
const { validateCreateOffice, validateEditOffice, validateDeleteOffice } = require("../middleware/validate");
const { authenticate } = require("../middleware/authenticate");
const router = express.Router();

router.get("/offices", OfficeController.getOffices);
router.get("/offices/:officeId", OfficeController.getOfficeById);
router.post("/create-office", [authenticate, validateCreateOffice, OfficeController.createOffice]);
router.post("/edit-office", [authenticate, validateEditOffice, OfficeController.editOffice]);
router.post("/delete-office", [authenticate, validateDeleteOffice, OfficeController.deleteOffice]);

module.exports = router;
