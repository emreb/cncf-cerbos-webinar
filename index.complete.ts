import express from "express";
import { GRPC as Cerbos } from "@cerbos/grpc";
import { expenses, users } from "./db";

const app = express();
app.use(express.json());

const cerbos = new Cerbos("localhost:3593", { tls: false });

app.use((req, res, next) => {
  if (!req.headers["user"]) return res.status(403).end();
  req.user = users[req.headers["user"][0]];
  next();
});

// View an expense
app.get("/expenses/:id", async (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  const permissions = await cerbos.checkResource({
    principal: req.user,
    resource: { kind: "expense", ...expense },
    actions: ["view"],
  });

  if (!permissions.isAllowed("view")) {
    return res.status(403).json({ error: "Action not permitted" });
  }

  // do the action
  return res.json(expense);
});

// View who approved an expense
app.get("/expenses/:id/approver", async (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  const permissions = await cerbos.checkResource({
    principal: req.user,
    resource: { kind: "expense", ...expense },
    actions: ["view:approver"],
  });

  if (!permissions.isAllowed("view:approver")) {
    return res.status(403).json({ error: "Action not permitted" });
  }

  // do the action
  return res.json(expense);
});

// Approve an expense
app.post("/expenses/:id/approve", async (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  const permissions = await cerbos.checkResource({
    principal: req.user,
    resource: { kind: "expense", ...expense },
    actions: ["view"],
  });

  if (!permissions.isAllowed("approve")) {
    return res.status(403).json({ error: "Action not permitted" });
  }

  // do the action
  return res.json(expense);
});

// Update an expense
app.patch("/expenses/:id", async (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  const permissions = await cerbos.checkResource({
    principal: req.user,
    resource: { kind: "expense", ...expense },
    actions: ["update"],
  });

  if (!permissions.isAllowed("update")) {
    return res.status(403).json({ error: "Action not permitted" });
  }

  // do the action
  return res.json(expense);
});

// Delete an expense
app.delete("/expenses/:id", async (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  const permissions = await cerbos.checkResource({
    principal: req.user,
    resource: { kind: "expense", ...expense },
    actions: ["delete"],
  });

  if (!permissions.isAllowed("delete")) {
    return res.status(403).json({ error: "Action not permitted" });
  }

  // do the action
  return res.json(expense);
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});

