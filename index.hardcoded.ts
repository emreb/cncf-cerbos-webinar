import express from "express";
import { expenses, users } from "./db";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  if (!req.headers["user"])
    return res.status(403).json({ error: "no user header provided" });
  req.user = users[req.headers.user as string];
  next();
});

// View an expense
app.get("/expenses/:id", (req, res) => {
  const user = req.user;
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  if (user.roles.includes("ADMIN")) {
    return res.json(expense);
  }

  if (user.roles.includes("USER") && user.attributes.department === "FINANCE") {
    return res.json(expense);
  }

  if (user.roles.includes("USER") && user.id === expense.attributes.ownerId) {
    return res.json(expense);
  }

  return res.status(403).json({ error: "Action not permitted" });
});

// View who approved an expense
app.get("/expenses/:id/approver", (req, res) => {
  const user = req.user;
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  if (user.roles.includes("ADMIN")) {
    return res.json({ approvedBy: expense.attributes.approvedBy });
  }

  if (user.roles.includes("USER") && user.attributes.department === "FINANCE") {
    return res.json({ approvedBy: expense.attributes.approvedBy });
  }

  if (
    user.roles.includes("USER") &&
    user.id === expense.attributes.ownerId &&
    expense.attributes.status === "APPROVED"
  ) {
    return res.json({ approvedBy: expense.attributes.approvedBy });
  }

  return res.status(403).json({ error: "Action not permitted" });
});

// Approve an expense
app.post("/expenses/:id/approve", (req, res) => {
  const user = req.user;
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  if (user.roles.includes("ADMIN")) {
    return res.json({ result: "expense approved" });
  }

  if (
    user.roles.includes("USER") &&
    user.attributes.department === "FINANCE" &&
    expense.attributes.status === "OPEN" &&
    user.id !== expense.attributes.ownerId
  ) {
    return res.json({ result: "expense approved" });
  }

  return res.status(403).json({ error: "Action not permitted" });
});

// Update an expense
app.patch("/expenses/:id", (req, res) => {
  const user = req.user;
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  if (user.roles.includes("ADMIN")) {
    return res.json({ result: "expense updated" });
  }

  if (
    user.roles.includes("USER") &&
    user.id === expense.attributes.ownerId &&
    expense.attributes.status === "OPEN"
  ) {
    return res.json({ result: "expense updated" });
  }

  return res.status(403).json({ error: "Action not permitted" });
});

// Delete an expense
app.delete("/expenses/:id", (req, res) => {
  const user = req.user;
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  if (user.roles.includes("ADMIN")) {
    return res.json({ result: "expense deleted" });
  }

  if (
    user.roles.includes("USER") &&
    expense.attributes.status === "OPEN" &&
    new Date().getTime() - new Date(expense.attributes.createdAt).getTime() <
      36000
  ) {
    return res.json({ result: "expense deleted" });
  }

  return res.status(403).json({ error: "Action not permitted" });
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
