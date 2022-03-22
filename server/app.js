//Server and socket.io
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
//Database and config
const dotenv = require("dotenv");
const logger = require("morgan");
const { pgConnect, pgDisconnect } = require("./src/db/postgres");
const cors = require("cors");
const { resetTicketSequence } = require("./src/jobs/scheduler");
const path = require("path");

//API
const authRoutes = require("./src/routes/auth");
const centerRoutes = require("./src/routes/center");
const officeRoutes = require("./src/routes/office");
const ticketTypeRoutes = require("./src/routes/ticket-type");
const commonRoutes = require("./src/routes/common");
const labRoutes = require("./src/routes/lab");
const printerSettingRoutes = require("./src/routes/printer-setting");
const ticketRoutes = require("./src/routes/ticket");
dotenv.config();

// Socket.io init
global.io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

server.listen(process.env.PORT, () => {
  console.log("Server is up!");
});

// Make connection to postgres database
pgConnect();
resetTicketSequence();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", centerRoutes);
app.use("/api", officeRoutes);
app.use("/api", ticketTypeRoutes);
app.use("/api", commonRoutes);
app.use("/api", labRoutes);
app.use("/api", printerSettingRoutes);
app.use("/api", ticketRoutes);

// Site hosting
app.use(express.static("public"));
app.use(express.static(__dirname + "/public/dist/ticketos"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/dist/ticketos/index.html"));
});

// Exception handlers
process.on("uncaughtException", (error) => {
  console.log("Something went wrong: ", error);
  process.exit(1); // exit application
});

process.on("unhandledRejection", (error, promise) => {
  console.log(" Handle a promise rejection: ", promise);
  console.log(" The error was: ", error);
});

process.on("SIGINT", function () {
  console.log("Closing postgres connection");
  pgDisconnect();
  process.exit();
});
