const { dbClient } = require("../db/postgres");

//TODO: CRUD and more for ticket types

exports.getOffices = (req, res) => {
  const pgClient = dbClient();

  pgClient
    .query(
      'SELECT office_id AS "officeId", number, center_id AS "centerId", name FROM offices ORDER BY number'
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET offices from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getOfficeById = (req, res) => {
  const pgClient = dbClient();
  const officeId = req.params.officeId;

  pgClient
    .query(
      'SELECT office_id AS "officeId", number, center_id AS "centerId", name FROM offices WHERE office_id = $1',
      [officeId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET office from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.createOffice = (req, res) => {
  const pgClient = dbClient();
  const number = req.body.number;
  const centerId = req.body.centerId;
  const name = req.body.name;

  pgClient
    .query(
      "INSERT INTO offices(office_id, number, center_id, name) VALUES (DEFAULT, $1, $2, $3)",
      [number, centerId, name]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT office into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.editOffice = (req, res) => {
  const pgClient = dbClient();
  const number = req.body.number;
  const name = req.body.name;
  const officeId = req.body.officeId;

  pgClient
    .query("UPDATE offices SET number = $1, name = $2, WHERE office_id = $3", [
      number,
      name,
      officeId,
    ])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot UPDATE office in DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.deleteOffice = (req, res) => {
  const pgClient = dbClient();
  const officeId = req.body.centerId;

  pgClient
    .query("DELETE FROM offices WHERE office_id = $1", [officeId])
    .then(() => {
      res.status(200).send({ message: "Office deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot DELETE office from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};
