const { getClient } = require("../db/postgres");

exports.createAdminAccount = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query("INSERT INTO users (user_id, username, password) VALUES(DEFAULT, 'admin', 'admin')")
    .then((result) => {
      res.status(200).send({ message: "Created admin account" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot CREATE admin account",
        detailed_message: err,
      });
      console.error(err);
    });
};
