const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const { pgConnect } = require("./postgres/config");

const authRoutes = require("./src/routes/auth");
const fileRoutes = require("./src/routes/file");
const centerRoutes = require("./src/routes/center");
const officeRoutes = require("./src/routes/office");
const ticketTypeRoutes = require("./src/routes/ticket-type");

dotenv.config();
const app = express();

// Make connection to postgres database
pgConnect();

app.use(logger("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/ticket-types", ticketTypeRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is up!");
});
const io = require("socket.io")(server, {
  pingInterval: 3000,
  pingTimeout: 7000,
});

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
