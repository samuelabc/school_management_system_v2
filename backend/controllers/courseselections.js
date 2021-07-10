const courseselectionsRouter = require("express").Router();
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

courseselectionsRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM courseselection;";
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

courseselectionsRouter.post("/", async (request, response) => {
  const courseselect = request.body;
  var sql = "INSERT INTO courseselection VALUES(";
  if (courseselect.course_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${courseselect.course_id}',`;
  }
  if (courseselect.student_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${courseselect.student_id}',`;
  }
  if (courseselect.grade === "") {
    sql += "NULL";
  } else {
    sql += `'${courseselect.grade}'`;
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

courseselectionsRouter.delete("/:coid/:stid", async (request, response) => {
  const course_id = request.params.coid;
  const student_id = request.params.stid;

  var sql = `DELETE FROM courseselection WHERE course_id='${course_id}' AND student_id='${student_id}';`;
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

courseselectionsRouter.put("/:coid/:stid", async (request, response) => {
  const courseselect = request.body;
  const oriCourseId = request.params.coid;
  const oriStudentId = request.params.stid;
  var sql = "UPDATE courseselection SET ";
  if (courseselect.course_id === "") {
    sql += "course_id=NULL, ";
  } else {
    sql += `course_id='${courseselect.course_id}',`;
  }
  if (courseselect.student_id === "") {
    sql += "student_id=NULL, ";
  } else {
    sql += `student_id='${courseselect.student_id}',`;
  }
  if (courseselect.grade === "") {
    sql += "grade=NULL ";
  } else {
    sql += `grade='${courseselect.grade}' `;
  }
  sql += `WHERE course_id='${oriCourseId}' AND student_id='${oriStudentId}';`;
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
      response.status(204).end();
    }
  });
});

module.exports = courseselectionsRouter;
