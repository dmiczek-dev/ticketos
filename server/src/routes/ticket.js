const express = require("express");
const TicketController = require("../controllers/TicketController");
const router = express.Router();

router.get("/live-tickets", TicketController.getLiveTickets);
router.post("/create-ticket", TicketController.createTicket);
router.post("/newest-tickets-for-center", TicketController.getNewestTicketsForCenter);

module.exports = router;
