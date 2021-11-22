const { getClient } = require("../db/postgres");

exports.getOffices = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query('SELECT office_id AS "officeId", name, audio, type, center_id AS "centerId" FROM offices ORDER BY office_id')
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
  const pgClient = getClient();
  const officeId = req.params.officeId;

  pgClient
    .query('SELECT office_id AS "officeId", name, audio, type, center_id AS "centerId" FROM offices WHERE office_id = $1', [officeId])
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
  const pgClient = getClient();
  const audio = req.body.audio;
  const type = req.body.type;
  const centerId = req.body.centerId;
  const name = req.body.name;

  pgClient
    .query("INSERT INTO offices(office_id, name, audio, type, center_id) VALUES (DEFAULT, $1, $2, $3, $4)", [name, audio, type, centerId])
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
  const pgClient = getClient();
  const name = req.body.name;
  const audio = req.body.audio;
  const type = req.body.type;
  const centerId = req.body.centerId;
  const officeId = req.body.officeId;

  pgClient
    .query("UPDATE offices SET name = $1, audio = $2, type = $3, center_id = $4 WHERE office_id = $5", [
      name,
      audio,
      type,
      centerId,
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
  const pgClient = getClient();
  const officeId = req.body.officeId;

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
