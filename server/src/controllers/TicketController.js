const { getClient } = require("../db/postgres");

exports.getLiveTickets = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query("SELECT * FROM live_tickets")
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET live tickets from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.createTicket = (req, res) => {
  const pgClient = getClient();
  const ticketTypeId = req.body.ticketTypeId;
  const centerId = req.body.centerId;

  pgClient
    .query(
      `INSERT INTO tickets(ticket_id, number, print_date, confirm_date, call_date, service_date, ticket_type_id, center_id, office_id) VALUES(DEFAULT, DEFAULT, CURRENT_DATE, NULL, NULL, NULL, $1, $2, NULL) RETURNING number`,
      [ticketTypeId, centerId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
      io.emit("newTicketAppear");
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT ticket into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getNewestTicketsForCenter = (req, res) => {
  const pgClient = getClient();
  const centerId = req.body.centerId;
  console.log(req.body);

  pgClient
    .query(
      "SELECT * FROM tickets_view WHERE center_id = $1 AND EXTRACT(DAY FROM print_date) = EXTRACT(DAY FROM now()) AND EXTRACT(MONTH FROM print_date) = EXTRACT(MONTH FROM now()) AND EXTRACT(YEAR FROM print_date) = EXTRACT(YEAR FROM now()) AND confirm_date IS NULL ORDER BY sequence",
      [centerId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET newest tickets from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};
