const { getClient } = require("../db/postgres");
const schedule = require("node-schedule");

exports.resetTicketSequence = () => {
  const pgClient = getClient();
  schedule.scheduleJob("0 0 * * *", () => {
    //Delete lost tickets
    pgClient
      .query("DELETE FROM tickets WHERE call_date IS NULL")
      .then(() => {
        console.dir("Removing old tickets: " + new Date());
        io.emit("");
      })
      .catch((err) => {
        throw err;
      });

    //Restart tickets number sequence
    pgClient
      .query("ALTER SEQUENCE tickets_number_seq RESTART WITH 1")
      .then(() => {
        console.dir("Restarting tickets sequence: " + new Date());
      })
      .catch((err) => {
        throw err;
      });
  });
};
