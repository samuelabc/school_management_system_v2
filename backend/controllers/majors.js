const majorsRouter = require("express").Router();
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

majorsRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM major;";
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

majorsRouter.post("/", async (request, response) => {
  const major = request.body;
  var sql = "INSERT INTO major VALUES(";
  if (major.major_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${major.major_id}',`;
  }
  if (major.name === "") {
    sql += "NULL,";
  } else {
    sql += `'${major.name}',`;
  }
  if (major.department_id === "") {
    sql += "NULL";
  } else {
    sql += `'${major.department_id}'`;
  }
  sql += ")";
  console.log(sql);
  // await connection.query(`INSERT INTO major VALUES('${major.major_id}', '${major.name}', '${major.class_id}')`);
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

majorsRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  var sql = `DELETE FROM major WHERE major_id='${id}';`;
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

majorsRouter.put("/:id", async (request, response) => {
  const major = request.body;
  const id = request.params.id;
  console.log("updatemajor", major);
  console.log("id", id);
  var sql = "UPDATE major SET ";
  if (major.major_id === "") {
    sql += "major_id=NULL, ";
  } else {
    sql += `major_id='${major.major_id}',`;
  }
  if (major.name === "") {
    sql += "name=NULL, ";
  } else {
    sql += `name='${major.name}',`;
  }
  if (major.department_id === "") {
    sql += "department_id=NULL ";
  } else {
    sql += `department_id='${major.department_id}' `;
  }
  sql += `WHERE major_id='${id}';`;
  console.log(sql);
  // await connection.query
  // 	(`UPDATE major
  // 		SET major_id='${major.major_id}', name='${major.name}', class_id='${major.class_id}'
  // 		WHERE major_id='${id}';`
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

module.exports = majorsRouter;
