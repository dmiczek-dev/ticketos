const express = require("express");
const CommonController = require("../controllers/CommonController");
const router = express.Router();

router.get("/generate-access", CommonController.createAdminAccount);
router.get("/refresh-screens", CommonController.refreshScreens);

module.exports = router;
