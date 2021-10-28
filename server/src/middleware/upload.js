const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024; // 5MB

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/uploads/");
  },
  filename: (req, file, cb) => {
    let today = new Date().toISOString().replace(/T/, "").replace(/\..+/, "").replace(/-|:/g, "");
    cb(null, `${today}_${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
