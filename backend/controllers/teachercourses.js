const teachercoursesRouter = require("express").Router();
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

teachercoursesRouter.get("/:id", async (request, response) => {
  const teacher_id = request.params.id;
  var sql = `SELECT * FROM TeachingCourses WHERE teacher_id = '${teacher_id}';`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.send(result);
    }
  });
});

teachercoursesRouter.get("/1/:id", async (request, response) => {
  //student taken course
  const course_id = request.params.id;
  var sql = `CALL StudentsTakenCourse('${course_id}')`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.send(result);
    }
  });
});

teachercoursesRouter.put("/:coid/:stid", async (request, response) => {
  const courseselect = request.body;
  const oriCourseId = request.params.coid;
  const oriStudentId = request.params.stid;
  var sql = `UPDATE courseselection SET grade='${courseselect.grade}' 
				WHERE course_id='${oriCourseId}' AND student_id='${oriStudentId}';`;
  console.log(sql);
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

module.exports = teachercoursesRouter;
