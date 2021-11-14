const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const { pgConnect } = require("./src/db/postgres");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const centerRoutes = require("./src/routes/center");
const officeRoutes = require("./src/routes/office");
const ticketTypeRoutes = require("./src/routes/ticket-type");
const userRoutes = require("./src/routes/user");
const labRoutes = require("./src/routes/lab");
const printerSettingRoutes = require("./src/routes/printer-setting");
const ticketRoutes = require("./src/routes/ticket");

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionSuccessStatus: 200, //Some legacy browers choke on 204
  credentials: true,
};

// Make connection to postgres database
pgConnect();

app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", authRoutes);
app.use("/api", centerRoutes);
app.use("/api", officeRoutes);
app.use("/api", ticketTypeRoutes);
app.use("/api", userRoutes);
app.use("/api", labRoutes);
app.use("/api", printerSettingRoutes);
app.use("/api", ticketRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is up!");
});
const io = require("socket.io")(server, {
  pingInterval: 3000,
  pingTimeout: 7000,
});

module.exports = io;

// Site hosting
// app.use(express.static("public"));
// app.use(express.static(__dirname + "/public/dist/ticketos"));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname + "/public/dist/ticketos/index.html"));
// });

// Exception handlers
process.on("uncaughtException", (error) => {
  console.log("Something went wrong: ", error);
  process.exit(1); // exit application
});

process.on("unhandledRejection", (error, promise) => {
  console.log(" Handle a promise rejection: ", promise);
  console.log(" The error was: ", error);
});
