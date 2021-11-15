const express = require("express");
const CenterController = require("../controllers/CenterController");
const { validateCreateCenter, validateEditCenter, validateDeleteCenter } = require("../middleware/validate");
const { authenticate } = require("../middleware/authenticate");
const router = express.Router();

router.get("/centers", [CenterController.getCenters]);
router.get("/centers/:id", [CenterController.getCenterById]);
router.post("/create-center", [authenticate, validateCreateCenter, CenterController.createCenter]);
router.post("/edit-center", [authenticate, validateEditCenter, CenterController.editCenter]);
router.post("/delete-center", [authenticate, validateDeleteCenter, CenterController.deleteCenter]);

module.exports = router;
