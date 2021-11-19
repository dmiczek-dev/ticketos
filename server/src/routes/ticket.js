const express = require("express");
const TicketController = require("../controllers/TicketController");
const router = express.Router();

router.get("/live-tickets", TicketController.getLiveTickets);
router.post("/create-ticket", TicketController.createTicket);
router.post("/newest-tickets-for-center", TicketController.getNewestTicketsForCenter);
router.post("/confirmed-tickets-for-center", TicketController.getConfirmedTicketsForCenter);
router.post("/confirm-ticket", TicketController.confirmTicket);
router.post("/delete-ticket", TicketController.deleteTicket);
router.post("/call-ticket", TicketController.callTicket);
router.post("/service-ticket", TicketController.serviceTicket);
router.post("/service-ticket-and-break", TicketController.serviceTicketAndBreak);

module.exports = router;
