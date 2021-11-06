const express = require("express");
const CenterController = require("../controllers/CenterController");
const { validateCreateCenter, validateEditCenter, validateDeleteCenter } = require("../middleware/validate");
const router = express.Router();

router.get("/centers", [CenterController.getCenters]);
router.get("/centers/:shortcut", [CenterController.getCenterByShortcut]);
router.post("/create-center", [validateCreateCenter, CenterController.createCenter]);
router.post("/edit-center", [validateEditCenter, CenterController.editCenter]);
router.post("/delete-center", [validateDeleteCenter, CenterController.deleteCenter]);

module.exports = router;
