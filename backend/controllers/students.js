const studentsRouter = require("express").Router();
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

studentsRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM student";
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

studentsRouter.post("/", async (request, response) => {
  const student = request.body;
  var sql = "INSERT INTO student(student_id, name, class_id) VALUES(";
  if (student.student_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${student.student_id}',`;
  }
  if (student.name === "") {
    sql += "NULL,";
  } else {
    sql += `'${student.name}',`;
  }
  if (student.class_id === "") {
    sql += "NULL";
  } else {
    sql += `'${student.class_id}'`;
  }
  sql += ")";
  console.log(sql);
  // await connection.query(`INSERT INTO student VALUES('${student.student_id}', '${student.name}', '${student.class_id}')`);
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

studentsRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  var sql = `DELETE FROM student WHERE student_id='${id}';`;
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

studentsRouter.put("/:id", async (request, response) => {
  const student = request.body;
  const id = request.params.id;
  console.log("updatestudent", student);
  console.log("id", id);
  var sql = "UPDATE student SET ";
  if (student.student_id === "") {
    sql += "student_id=NULL, ";
  } else {
    sql += `student_id='${student.student_id}',`;
  }
  if (student.name === "") {
    sql += "name=NULL, ";
  } else {
    sql += `name='${student.name}',`;
  }
  if (student.class_id === "") {
    sql += "class_id=NULL ";
  } else {
    sql += `class_id='${student.class_id}' `;
  }
  sql += `WHERE student_id='${id}';`;
  console.log(sql);
  // await connection.query
  // 	(`UPDATE student
  // 		SET student_id='${student.student_id}', name='${student.name}', class_id='${student.class_id}'
  // 		WHERE student_id='${id}';`
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

module.exports = studentsRouter;
