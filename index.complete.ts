import express from "express";

import { GRPC as Cerbos } from "@cerbos/grpc";

const app = express();
app.use(express.json());

const cerbos = new Cerbos("localhost:3593", { tls: false });

interface User {
  id: string;
  roles: string[];
  attributes: {
    department: string;
    region?: string;
  };
}

interface Expense {
  id: string;
  attributes: {
    amount: number;
    ownerId: string;
    status: "OPEN" | "APPROVED" | "REJECTED";
  };
}

const users: Record<string, User> = {
  alan: {
    id: "alan",
    roles: ["admin"],
    attributes: {
      department: "IT",
      region: "EMEA",
    },
  },
  bobby: {
    id: "bobby",
    roles: ["user"],
    attributes: {
      department: "IT",
      region: "EMEA",
    },
  },
  mike: {
    id: "mike",
    roles: ["user", "manager"],
    attributes: {
      department: "IT",
      region: "EMEA",
    },
  },
};

const expenses: Record<string, Expense> = {};

app.use((req, res, next) => {
  if (!req.headers["user"]) return res.status(403).end();
  req.user = users[req.headers["user"][0]];
  next();
});

app.get("/", (req, res) => {
  res.send("Well done!");
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

  if (permissions.isAllowed("view")) {
    // do the action
    return res.json(expense);
  } else {
    return res.status(403).json({ error: "Action not permitted" });
  }
});

// View who approved an expense
app.get("/expenses/:id/approver", async (req, res) => {
  const expense = expenses[req.params.id];
  if (!expense) return res.status(404).json({ error: "Expense not found" });

  const permissions = await cerbos.checkResource({
    principal: req.user,
    resource: { kind: "expense", ...expense },
    actions: ["view"],
  });

  if (permissions.isAllowed("view:approver")) {
    // do the action
    return res.json(expense);
  } else {
    return res.status(403).json({ error: "Action not permitted" });
  }
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

  if (permissions.isAllowed("approve")) {
    // do the action
    return res.json(expense);
  } else {
    return res.status(403).json({ error: "Action not permitted" });
  }
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

  if (permissions.isAllowed("update")) {
    // do the action
    return res.json(expense);
  } else {
    return res.status(403).json({ error: "Action not permitted" });
  }
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

  if (permissions.isAllowed("delete")) {
    // do the action
    return res.json(expense);
  } else {
    return res.status(403).json({ error: "Action not permitted" });
  }
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
