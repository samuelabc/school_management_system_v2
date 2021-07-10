const studentinfosRouter = require("express").Router();
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

studentinfosRouter.get("/:id", async (request, response) => {
  const teacher_id = request.params.id;
  var sql = `CALL GetTeacherInfo('${teacher_id}');`;

  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      response.status(404).json({ error: `${JSON.stringify(err)}` });
    } else if (result.length === 0) {
      console.log("opps! something error");
      response
        .status(404)
        .json({ error: `{"sqlMessage": "opps! something error"}` });
    } else {
      console.log("Result: " + JSON.stringify(result));
      response.send(result);
      // response.send({"student_id" : student_id, "student_name": student_name, "class_id" : class_id, "year" : year,
      // 	"major_id": major_id, "major_name": major_name, "department_id" : department_id, "department_name": department_name});
    }
  });
});

module.exports = studentinfosRouter;
