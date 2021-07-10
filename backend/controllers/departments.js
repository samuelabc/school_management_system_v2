const departmentsRouter = require("express").Router();
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

departmentsRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM department;";
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

departmentsRouter.post("/", async (request, response) => {
  const department = request.body;
  var sql = "INSERT INTO department VALUES(";
  if (department.department_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${department.department_id}',`;
  }
  if (department.name === "") {
    sql += "NULL";
  } else {
    sql += `'${department.name}'`;
  }
  sql += ")";
  console.log(sql);
  // await connection.query(`INSERT INTO department VALUES('${department.department_id}', '${department.name}', '${department.class_id}')`);
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

departmentsRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  var sql = `DELETE FROM department WHERE department_id='${id}';`;
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

departmentsRouter.put("/:id", async (request, response) => {
  const department = request.body;
  const id = request.params.id;
  console.log("updatedepartment", department);
  console.log("id", id);
  var sql = "UPDATE department SET ";
  if (department.department_id === "") {
    sql += "department_id=NULL, ";
  } else {
    sql += `department_id='${department.department_id}',`;
  }
  if (department.name === "") {
    sql += "name=NULL ";
  } else {
    sql += `name='${department.name}' `;
  }
  sql += `WHERE department_id='${id}';`;
  console.log(sql);
  // await connection.query
  // 	(`UPDATE department
  // 		SET department_id='${department.department_id}', name='${department.name}', class_id='${department.class_id}'
  // 		WHERE department_id='${id}';`
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

module.exports = departmentsRouter;
