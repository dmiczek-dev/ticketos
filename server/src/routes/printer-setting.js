const express = require("express");
const PrinterSettingController = require("../controllers/PrinterSettingController");
const { validateCreatePrinterSetting, validateEditPrinterSetting, validateDeletePrinterSetting } = require("../middleware/validate");
const { authenticate } = require("../middleware/authenticate");
const router = express.Router();

router.get("/printer-settings", [PrinterSettingController.getPrinterSettings]);
router.get("/printer-settings/:id", [PrinterSettingController.getPrinterSettingById]);
router.get("/printer-settings-by-center/:centerId", [PrinterSettingController.getPrinterSettingByCenterId]);
router.post("/create-printer-setting", [authenticate, validateCreatePrinterSetting, PrinterSettingController.createPrinterSetting]);
router.post("/edit-printer-setting", [authenticate, validateEditPrinterSetting, PrinterSettingController.editPrinterSetting]);
router.post("/delete-printer-setting", [authenticate, validateDeletePrinterSetting, PrinterSettingController.deletePrinterSetting]);

module.exports = router;
