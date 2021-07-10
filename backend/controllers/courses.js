const coursesRouter = require("express").Router();

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

coursesRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM course";
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

coursesRouter.post("/", async (request, response) => {
  const course = request.body;
  console.log(course);
  var sql = "INSERT INTO course VALUES(";
  if (course.course_id === "") {
    sql += "NULL, ";
  } else {
    sql += `'${course.course_id}', `;
  }
  if (course.name === "") {
    sql += "NULL, ";
  } else {
    sql += `'${course.name}', `;
  }
  if (course.teacher_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${course.teacher_id}',`;
  }
  if (course.department_id === "") {
    sql += "NULL)";
  } else {
    sql += `'${course.department_id}')`;
  }
  // await connection.query(`INSERT INTO course VALUES('${course.course_id}', '${course.name}', '${course.teacher_id}')`);
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

coursesRouter.delete("/:coid/:tcid", async (request, response) => {
  console.log(request.params);
  const course_id = request.params.coid;
  const teacher_id = request.params.tcid;
  console.log("courseid", course_id);
  console.log("teacherid", teacher_id);
  var sql = `DELETE FROM course WHERE course_id='${course_id}' AND teacher_id='${teacher_id}';`;
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

coursesRouter.put("/:coid/:tcid", async (request, response) => {
  const course = request.body;
  const oriCourseId = request.params.coid;
  const oriTeacherId = request.params.tcid;
  console.log("updateCourse", course);
  console.log("id", oriCourseId, oriTeacherId);
  var sql = "UPDATE course SET ";
  if (course.course_id === "") {
    sql += "course_id=NULL,";
  } else {
    sql += `course_id='${course.course_id}', `;
  }
  if (course.name === "") {
    sql += "name=NULL,";
  } else {
    sql += `name='${course.name}', `;
  }
  if (course.teacher_id === "") {
    sql += "teacher_id=NULL, ";
  } else {
    sql += `teacher_id='${course.teacher_id}', `;
  }
  if (course.department_id === "") {
    sql += "department_id=NULL ";
  } else {
    sql += `department_id='${course.department_id}' `;
  }
  sql += `WHERE course_id='${oriCourseId}' AND teacher_id='${oriTeacherId}';`;
  // await connection.query
  // 	(`UPDATE course
  // 		SET course_id='${course.course_id}', name='${course.name}', teacher_id='${course.teacher_id}'
  // 		WHERE course_id='${oriCourseId}' AND teacher_id='${oriTeacherId}';`
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

module.exports = coursesRouter;
