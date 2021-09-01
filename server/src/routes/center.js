const express = require("express");
const CenterController = require("../controllers/CenterController");
const router = express.Router();

router.get("/", CenterController.getCenters);
router.get("/:shortcut", CenterController.gerCenterByShortcut);
router.post("/create-center", CenterController.createCenter);
router.post("/edit-center", CenterController.editCenter);
router.post("/delete-center", CenterController.deleteCenter);

module.exports = router;
