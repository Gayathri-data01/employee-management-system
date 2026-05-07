const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    res.send(result);
  });
});

app.post("/employees", (req, res) => {
  const { name, empId, department, salary } = req.body;

  db.query(
    "INSERT INTO employees(name, empId, department, salary) VALUES (?, ?, ?, ?)",
    [name, empId, department, salary],
    () => res.send("Employee Added")
  );
});

app.delete("/employees/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id=?", [req.params.id], () => {
    res.send("Deleted");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
