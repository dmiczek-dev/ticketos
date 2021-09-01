const uploadFile = require("../middleware/upload");
const { dbClient } = require("../db/postgres");
const fs = require("fs");

exports.upload = async (req, res) => {
  const pgClient = dbClient();
  const filename = req.body.filename;
  const advertId = req.body.advertId;

  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please select a file!" });
    }

    pgClient
      .query("INSERT INTO files(filename, advert_id) VALUES($1, $2)", [
        filename,
        advertId,
      ])
      .then(() => {
        return res.status(200).send({
          message: "File uploaded successfully",
        });
      });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res
        .status(500)
        .send({ message: "File size cannot be larger then 5MB!" });
    }
    return res
      .status(500)
      .send({ message: `Could not upload the file: ${err}` });
  }
};

exports.getFilesList = (req, res) => {
  const path = __basedir + "/public/uploads/";

  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Files not found.",
      });
    }

    let filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        url: URL + file,
      });
    });

    res.status(200).send(filesList);
  });
};

exports.deleteFile = (req, res) => {
  const filename = req.body.filename;
  const path = __basedir + "/public/uploads/" + filename;

  client.query("DELETE FROM files WHERE name = $1", [filename]).then(() => {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          message: `Couldn't delete file named: ${req.body.filename}`,
        });
      } else {
        return res.status(200).send();
      }
    });
  });
};

exports.getFilesByAdvertId = (req, res) => {
  let filesFromDb = [];
  let filesList = [];
  const advertId = req.params.advertId;

  try {
    client
      .query(
        "SELECT file_id, filename, advert_id FROM files WHERE advert_id = $1",
        [advertId]
      )
      .then((result) => {
        filesFromDb = result.rows;
        filesList = filesFromDb.map((dbFile) => {
          return { name: dbFile.filename, url: URL + dbFile.filename };
        });
        return res.status(200).send(filesList);
      });
  } catch (err) {
    return res.status(500).send({ message: `Could not get files: ${err}` });
  }
};
