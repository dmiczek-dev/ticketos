const express = require("express");
const TicketTypeController = require("../controllers/TicketTypeController");
const { validateCreateTicketType, validateEditTicketType, validateDeleteTicketType } = require("../middleware/validate");
const { authenticate } = require("../middleware/authenticate");
const router = express.Router();

router.get("/ticket-types", TicketTypeController.getTicketTypes);
router.post("/create-ticket-type", [authenticate, validateCreateTicketType, TicketTypeController.createTicketType]);
router.post("/edit-ticket-type", [authenticate, validateEditTicketType, TicketTypeController.editTicketType]);
router.post("/delete-ticket-type", [authenticate, validateDeleteTicketType, TicketTypeController.deleteTicketType]);
router.post("/unpinned-ticket-types", TicketTypeController.getUnpinnedTicketTypesByOfficeId);
router.post("/pinned-ticket-types", TicketTypeController.getPinnedTicketTypesByOfficeId);
router.post("/add-ticket-type-to-office", TicketTypeController.addTicketTypeToOffice);
router.post("/remove-ticket-type-from-office", TicketTypeController.removeTicketTypeFromOffice);
router.post("/optimize-sequence-in-office", TicketTypeController.optimizeSequence);

module.exports = router;
