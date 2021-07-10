const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
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

usersRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM user;";
  connection.query(sql, function (err, result) {
    console.log("start query");
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.send(JSON.stringify(result));
    }
  });
});

usersRouter.post("/", async (request, response) => {
  const user = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  var sql = "";
  if (user.user_type === "student") {
    sql = `SELECT * FROM student WHERE '${user.user_id}' = student_id;`;
  } else if (user.user_type === "teacher") {
    sql = `SELECT * FROM teacher WHERE '${user.user_id}' = teacher_id;`;
  }
  if (sql !== "") {
    await connection.query(sql, function (err, result) {
      if (err) {
        console.log("error: " + JSON.stringify(err));
        response.status(404).json({ error: `${JSON.stringify(err)}` });
        return;
      } else if (result.length === 0) {
        console.log("incorrect user_id");
        response
          .status(404)
          .json({ error: `{"sqlMessage": "incorrect user_id"}` });
        return;
      }
    });
  }
  sql = "INSERT INTO user VALUES(";
  if (user.user_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${user.user_id}',`;
  }
  if (user.password === "") {
    sql += "NULL,";
  } else {
    sql += `'${passwordHash}',`;
  }
  if (user.user_type === "") {
    sql += "NULL";
  } else {
    sql += `'${user.user_type}'`;
  }
  sql += ")";
  console.log(sql);
  // await connection.query(`INSERT INTO class VALUES('${class.class_id}', '${class.name}', '${class.class_id}')`);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.send(JSON.stringify(result));
    }
  });
});

usersRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  var sql = `DELETE FROM user WHERE user_id='${id}';`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.status(204).end();
    }
  });
});

usersRouter.put("/:id", async (request, response) => {
  const user = request.body;
  const id = request.params.id;
  console.log("id", id);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  var sql = "";
  if (user.user_type === "student") {
    sql = `SELECT * FROM student WHERE '${user.user_id}' = student_id;`;
  } else if (user.user_type === "teacher") {
    sql = `SELECT * FROM teacher WHERE '${user.user_id}' = teacher_id;`;
  }
  if (sql !== "") {
    await connection.query(sql, function (err, result) {
      if (err) {
        console.log("error: " + JSON.stringify(err));
        response.status(404).json({ error: `${JSON.stringify(err)}` });
        return;
      } else if (result.length === 0) {
        console.log("incorrect user_id");
        response
          .status(404)
          .json({ error: `{"sqlMessage": "incorrect user_id"}` });
        return;
      }
    });
  }
  sql = "UPDATE user SET ";
  if (user.user_id === "") {
    sql += "user_id=NULL, ";
  } else {
    sql += `user_id='${user.user_id}',`;
  }
  if (user.password === "") {
    sql += "password=NULL, ";
  } else {
    sql += `password='${passwordHash}',`;
  }
  if (user.user_type === "") {
    sql += "user_type=NULL ";
  } else {
    sql += `user_type='${user.user_type}' `;
  }
  sql += `WHERE user_id='${id}';`;
  console.log(sql);
  // await connection.query
  // 	(`UPDATE class
  // 		SET class_id='${class.class_id}', name='${class.name}', class_id='${class.class_id}'
  // 		WHERE class_id='${id}';`
  // 	);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.send(JSON.stringify(result));
    }
  });
});

module.exports = usersRouter;
