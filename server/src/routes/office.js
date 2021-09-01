const express = require("express");
const OfficeController = require("../controllers/OfficeController");
const router = express.Router();

router.get("/", OfficeController.getOffices);
router.get("/:officeId", OfficeController.gerOfficeById);
router.post("/create", OfficeController.createOffice);
router.post("/edit", OfficeController.editOffice);
router.post("/delete", OfficeController.deleteOffice);
