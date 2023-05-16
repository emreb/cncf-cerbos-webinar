import express from "express";
import { expenses, users } from "./db";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  if (!req.headers["user"]) return res.status(403).end();
  req.user = users[req.headers["user"][0]];
  next();
});

// View an expense
app.get("/expenses/:id", (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });
});

// View who approved an expense
app.get("/expenses/:id/approver", (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });
});

// Approve an expense
app.post("/expenses/:id/approve", (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });
});

// Update an expense
app.patch("/expenses/:id", (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });
});

// Delete an expense
app.delete("/expenses/:id", (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});


