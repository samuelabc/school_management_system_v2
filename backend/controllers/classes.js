const classesRouter = require("express").Router();
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

classesRouter.get("/", async (request, response) => {
  var sql = "SELECT * FROM class;";
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

classesRouter.post("/", async (request, response) => {
  const class_ = request.body;
  var sql = "INSERT INTO class VALUES(";
  if (class_.class_id === "") {
    sql += "NULL,";
  } else {
    sql += `'${class_.class_id}',`;
  }
  if (class_.year === "") {
    sql += "NULL,";
  } else {
    sql += `'${class_.year}',`;
  }
  if (class_.major_id === "") {
    sql += "NULL";
  } else {
    sql += `'${class_.major_id}'`;
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

classesRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  var sql = `DELETE FROM class WHERE class_id='${id}';`;
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

classesRouter.put("/:id", async (request, response) => {
  const class_ = request.body;
  const id = request.params.id;
  console.log("updateclass", class_);
  console.log("id", id);
  var sql = "UPDATE class SET ";
  if (class_.class_id === "") {
    sql += "class_id=NULL, ";
  } else {
    sql += `class_id='${class_.class_id}',`;
  }
  if (class_.name === "") {
    sql += "year=NULL, ";
  } else {
    sql += `year='${class_.year}',`;
  }
  if (class_.major_id === "") {
    sql += "major_id=NULL ";
  } else {
    sql += `major_id='${class_.major_id}' `;
  }
  sql += `WHERE class_id='${id}';`;
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

module.exports = classesRouter;
