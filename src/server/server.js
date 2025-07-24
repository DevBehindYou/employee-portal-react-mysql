import express, { json } from "express";
import { createConnection } from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

// DB connection
const db = createConnection({
  host: "localhost",         
  user: "root",
  port: 3306,             
  password: "qqqq1111",
  database: "employee"
});

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM employee_details WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length > 0)
        return res.status(409).json({ message: "Employee already exists" });

      db.query(
        "INSERT INTO employee_details (username, password) VALUES (?, ?)",
        [username, password],
        (err, result) => {
          if (err) return res.status(500).json({ error: err });
          console.log(result);
          return res.status(200).json({ message: "Signup successful" });
        }
      );
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM employee_details WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      return res.status(200).json({ message: "Login successful" });
    }
  );
});

//  GET tasks by username
app.get("/tasks/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT * FROM employee_tasks WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    }
  );
});

//  POST (add) a new task
app.post("/tasks", (req, res) => {
  const { username, tasks } = req.body;
  db.query(
    "INSERT INTO employee_tasks (username, tasks, iscompleted) VALUES (?, ?, false)",
    [username, tasks],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Task added successfully", taskId: result.insertId });
    }
  );
});

//  DELETE a task by emp_id
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM employee_tasks WHERE emp_id = ?",
    [id],
    (err, result) => {
      console.log(result);
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Task deleted successfully" });
    }
  );
});

// PATCH - mark task as completed
app.patch("/tasks/:id/complete", (req, res) => {
  const taskId = req.params.id;
  db.query(
    "UPDATE employee_tasks SET iscompleted = 1 WHERE emp_id = ?",
    [taskId],
    (err, result) => {
      console.log(result);
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Task marked as completed" });
    }
  );
});

// Check today's attendance for a user
app.get("/attendance/:username", (req, res) => {
  const username = req.params.username;
  const today = new Date().toISOString().split("T")[0];

  db.query(
    "SELECT * FROM employee_attendance WHERE username = ? AND dates = ?",
    [username, today],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ checkedIn: result.length > 0 });
    }
  );
});

// Insert today's check-in
app.post("/attendance", (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0];

  db.query(
    "INSERT INTO employee_attendance (username, dates) VALUES (?, ?)",
    [username, today],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Already checked in today" });
        }
        console.log(result);
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Check-in successful" });
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
