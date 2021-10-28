const express = require("express");
const CenterController = require("../controllers/CenterController");
const router = express.Router();

router.get("/", CenterController.getCenters);
router.get("/:shortcut", CenterController.getCenterByShortcut);
router.post("/create", CenterController.createCenter);
router.post("/edit", CenterController.editCenter);
router.post("/delete", CenterController.deleteCenter);

module.exports = router;
