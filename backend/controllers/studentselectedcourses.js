const studentselectedcoursesRouter = require("express").Router();
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

studentselectedcoursesRouter.get("/:id", async (request, response) => {
  var student_id = request.params.id;
  var sql = `CALL StudentSelectedCourses('${student_id}');`;
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
      course_ids = result[0]["course_id"];
      console.log("Result: " + JSON.stringify(result));
      console.log("Result: ", result);
      response.send(result);
    }
  });
});

studentselectedcoursesRouter.delete(
  "/:coid/:stid",
  async (request, response) => {
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
  }
);

module.exports = studentselectedcoursesRouter;
