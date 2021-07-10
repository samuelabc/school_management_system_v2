const teachersRouter = require("express").Router();
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

teachersRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM teacher";
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

teachersRouter.post("/", async (request, response) => {
  const teacher = request.body;
  console.log(teacher);
  var sql = "INSERT INTO teacher VALUES(";
  if (teacher.teacher_id === "") {
    sql += `NULL, `;
  } else {
    sql += `'${teacher.teacher_id}', `;
  }
  if (teacher.name === "") {
    sql += `NULL, `;
  } else {
    sql += `'${teacher.name}', `;
  }
  if (teacher.department_id === "") {
    sql += `NULL)`;
  } else {
    sql += `'${teacher.department_id}')`;
  }
  // await connection.query(`INSERT INTO teacher VALUES('${teacher.teacher_id}', '${teacher.name}', '${teacher.department_id}')`);
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

teachersRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  var sql = `DELETE FROM teacher WHERE teacher_id='${id}';`;
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

teachersRouter.put("/:id", async (request, response) => {
  const teacher = request.body;
  const id = request.params.id;
  console.log("updateteacher", teacher);
  console.log("id", id);
  var sql = "UPDATE teacher SET ";
  if (teacher.teacher_id === "") {
    sql += "teacher_id=NULL, ";
  } else {
    sql += `teacher_id='${teacher.teacher_id}',`;
  }
  if (teacher.name === "") {
    sql += "name=NULL, ";
  } else {
    sql += `name='${teacher.name}',`;
  }
  if (teacher.department_id === "") {
    sql += "department_id=NULL, ";
  } else {
    sql += `department_id='${teacher.department_id}' `;
  }
  sql += `WHERE teacher_id='${id}';`;
  // await connection.query
  // 	(`UPDATE teacher
  // 		SET teacher_id='${teacher.teacher_id}', name='${teacher.name}', department_id='${teacher.department_id}'
  // 		WHERE teacher_id='${id}';`
  // 	);
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

module.exports = teachersRouter;
