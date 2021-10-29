const { Client } = require("pg");
let client;

exports.pgConnect = () => {
  client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_NAME,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  // Handle disconnect
  client.on("error", () => {
    console.log("Disconnect from postgres");
  });

  client.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected to PostgresDB");
    }
  });
};

exports.getClient = () => {
  return client;
};
