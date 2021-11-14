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
