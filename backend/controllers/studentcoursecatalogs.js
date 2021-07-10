const studentcoursecatalogsRouter = require("express").Router();
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

studentcoursecatalogsRouter.get("/:id", async (request, response) => {
  var student_id = request.params.id;
  var sql = `CALL StudentNotSelectedCourses('${student_id}');`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
      return;
    } else if (result.length === 0) {
      console.log("opps! something error");
      response
        .status(404)
        .json({ error: `{"sqlMessage": "opps! something error"}` });
      return;
    } else {
      console.log("Result: " + JSON.stringify(result));
      console.log("Result: ", result);
      response.send(result);
    }
  });
});

studentcoursecatalogsRouter.post("/", async (request, response) => {
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
  sql += "0";
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

module.exports = studentcoursecatalogsRouter;
