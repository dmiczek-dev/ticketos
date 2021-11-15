const { getClient } = require("../db/postgres");

exports.getPrinterSettings = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query('SELECT printer_setting_id AS "printerSettingId", title, subtitle, statement, center_id AS "centerId" FROM printer_settings')
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET printer settings from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getPrinterSettingById = (req, res) => {
  const pgClient = getClient();
  printerSettingId = req.params["id"];

  pgClient
    .query(
      'SELECT printer_setting_id AS "printerSettingId", title, subtitle, statement, center_id AS "centerId" FROM printer_settings WHERE printer_setting_id = $1',
      [printerSettingId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET printer setting from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getPrinterSettingByCenterId = (req, res) => {
  const pgClient = getClient();
  centerId = req.params["centerId"];

  pgClient
    .query(
      'SELECT printer_setting_id AS "printerSettingId", title, subtitle, statement, center_id AS "centerId" FROM printer_settings WHERE center_id = $1',
      [centerId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET printer setting from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.createPrinterSetting = (req, res) => {
  const pgClient = getClient();
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const statement = req.body.statement;
  const centerId = req.body.centerId;

  pgClient
    .query("INSERT INTO printer_settings VALUES (DEFAULT, $1, $2, $3, $4)", [title, subtitle, statement, centerId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT printer setting into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.editPrinterSetting = (req, res) => {
  const pgClient = getClient();
  const printerSettingId = req.body.printerSettingId;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const statement = req.body.statement;
  const centerId = req.body.centerId;

  pgClient
    .query("UPDATE printer_settings SET title = $1, subtitle = $2, statement = $3, center_id = $4 WHERE printer_setting_id = $5", [
      title,
      subtitle,
      statement,
      centerId,
      printerSettingId,
    ])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot UPDATE printer setting in DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.deletePrinterSetting = (req, res) => {
  const pgClient = getClient();
  const printerSettingId = req.body.printerSettingId;

  pgClient
    .query("DELETE FROM printer_settings WHERE printer_setting_id = $1", [printerSettingId])
    .then(() => {
      res.status(200).send({ message: "Printer setting deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot DELETE printer setting from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};
