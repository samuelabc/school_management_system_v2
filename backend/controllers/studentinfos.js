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
  const student_id = request.params.id;

  var sql = `CALL GetStudentInfo('${student_id}')`;
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
      response.send(result);
    }
  });
});

module.exports = studentinfosRouter;
