const { getClient } = require("../db/postgres");
const { generateAccessToken } = require("../helpers/auth");

exports.login = (req, res) => {
  const pgClient = getClient();
  const username = req.body.username;
  const password = req.body.password;

  //TODO Optional: Hash password
  pgClient
    .query("SELECT * FROM users WHERE username = $1 and password = $2", [username, password])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(401).send({
          message: "Invalid username or password",
        });
      } else {
        let dbUser = result.rows[0];
        const accessToken = generateAccessToken({ userId: dbUser.userId });
        res.status(200).send({ token: accessToken });
      }
    })
    .catch((err) => {
      res.status(401).send({
        message: "Something went wrong",
      });
      conseole.error(err);
    });
};
