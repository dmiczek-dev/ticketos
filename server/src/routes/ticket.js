const express = require("express");
const TicketController = require("../controllers/TicketController");
const router = express.Router();

router.get("/live-tickets", TicketController.getLiveTickets);

module.exports = router;
