const { getClient } = require("../db/postgres");

exports.getCenters = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query('SELECT center_id AS "centerId", name, shortcut FROM centers')
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET centers from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getCenterByShortcut = (req, res) => {
  const pgClient = getClient();
  const shortcut = req.params.shortcut;

  pgClient
    .query('SELECT center_id AS "centerId", name, active, shortcut FROM centers WHERE shortcut ilike $1', [shortcut])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET center from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.createCenter = (req, res) => {
  const pgClient = getClient();
  const name = req.body.name;
  const shortcut = req.body.shortcut;

  pgClient
    .query("INSERT INTO centers VALUES (DEFAULT, $1, $2)", [name, shortcut])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT center into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.editCenter = (req, res) => {
  const pgClient = getClient();
  const name = req.body.name;
  const shortcut = req.body.shortcut;
  const centerId = req.body.centerId;

  pgClient
    .query("UPDATE centers SET name = $1, shortcut = $2 WHERE center_id = $3", [name, shortcut, centerId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot UPDATE center in DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.deleteCenter = (req, res) => {
  const pgClient = getClient();
  const centerId = req.body.centerId;

  pgClient
    .query("DELETE FROM centers WHERE center_id = $1", [centerId])
    .then(() => {
      res.status(200).send({ message: "Center deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot DELETE center from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};
