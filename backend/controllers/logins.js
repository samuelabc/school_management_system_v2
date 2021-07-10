const loginsRouter = require("express").Router();
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

loginsRouter.post("/", async (request, response) => {
  const user = request.body;

  var sql = "SELECT * FROM user WHERE ";
  if (user.user_id === "") {
    sql += " user_id=NULL ";
  } else {
    sql += ` user_id='${user.user_id}' `;
  }
  // if (user.password === '') {
  // 	sql += (' password=NULL');
  // }
  // else if (user.user_id === 'adminroot') {	//backdoor?
  // 	sql += (` password='${user.password}'`);
  // }
  // else {
  // 	sql += (` password='${passwordHash}'`);
  // }
  sql += ";";
  console.log(sql);
  // await connection.query(`INSERT INTO class VALUES('${class.class_id}', '${class.name}', '${class.class_id}')`);
  connection.query(sql, async function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else if (result.length === 0) {
      console.log("incorrect user_id");
      response
        .status(404)
        .json({ error: `{"sqlMessage": "user_id does not exist"}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      const passwordHash = result[0].password;
      const passwordCorrect =
        user.user_id === "adminroot" && user.password === passwordHash
          ? true
          : await bcrypt.compare(user.password, passwordHash);
      if (passwordCorrect) {
        response.send(JSON.stringify(result));
      } else {
        console.log("incorrect user_id");
        response
          .status(404)
          .json({ error: `{"sqlMessage": "incorrect password"}` });
      }
    }
  });
});

module.exports = loginsRouter;
