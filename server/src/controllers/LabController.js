const { getClient } = require("../db/postgres");

exports.getLabs = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query('SELECT lab_id AS "labId", name, description, center_id AS "centerId" FROM labs')
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET labs from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.createLab = (req, res) => {
  const pgClient = getClient();
  const name = req.body.name;
  const description = req.body.description;
  const centerId = req.body.centerId;

  pgClient
    .query("INSERT INTO labs VALUES (DEFAULT, $1, $2, $3)", [name, description, centerId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT lab into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.editLab = (req, res) => {
  const pgClient = getClient();
  const labId = req.body.labId;
  const name = req.body.name;
  const description = req.body.description;
  const centerId = req.body.centerId;

  pgClient
    .query("UPDATE labs SET name = $1, description = $2, center_id = $3 WHERE lab_id = $4", [name, description, centerId, labId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot UPDATE lab in DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.deleteLab = (req, res) => {
  const pgClient = getClient();
  const labId = req.body.labId;

  pgClient
    .query("DELETE FROM labs WHERE lab_id = $1", [labId])
    .then(() => {
      res.status(200).send({ message: "Lab deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot DELETE lab from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};
