const changepasswordsRouter = require("express").Router();
const bcrypt = require("bcrypt");

var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "school_database",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

changepasswordsRouter.post("/", async (request, response) => {
  const user = request.body;
  const saltRounds = 10;
  const newPasswordHash =
    user.user_id === "adminroot"
      ? user.new_password
      : await bcrypt.hash(user.new_password, saltRounds);

  var sql = `SELECT * FROM user WHERE user_id='${user.user_id}';`;
  console.log(sql);
  // await connection.query(`INSERT INTO class VALUES('${class.class_id}', '${class.name}', '${class.class_id}')`);
  await connection.query(sql, async function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
      return;
    } else if (result.length === 0) {
      console.log("incorrect user_id does not exist");
      response
        .status(404)
        .json({ error: `{"sqlMessage": "user_id does not exist"}` });
      return;
    } else {
      console.log("Result: " + JSON.stringify(result));
      const passwordHash = result[0].password;
      const passwordCorrect =
        user.user_id === "adminroot" && user.old_password === passwordHash
          ? true
          : await bcrypt.compare(user.old_password, passwordHash);
      console.log("password correct? ", passwordCorrect);
      if (passwordCorrect) {
        sql = `UPDATE user SET password='${newPasswordHash}' WHERE user_id='${user.user_id}';`;
        await connection.query(sql, function (err, result) {
          if (err) {
            console.log("error: " + JSON.stringify(err));
            response.status(404).json({ error: `${JSON.stringify(err)}` });
            return;
          } else if (result.length === 0) {
            console.log("something wrong");
            response
              .status(404)
              .json({ error: `{"sqlMessage": "something wrong"}` });
            return;
          } else {
            console.log("Result: " + JSON.stringify(result));
            response.send(JSON.stringify(result));
          }
        });
      } else {
        console.log("wrong password");
        response
          .status(404)
          .json({ error: `{"sqlMessage": "wrong password"}` });
        return;
      }
    }
  });
});

module.exports = changepasswordsRouter;
