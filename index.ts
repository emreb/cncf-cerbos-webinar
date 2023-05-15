import express from "express";

const app = express();
app.use(express.json());

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
    amount: number
		ownerId: string
		status: "OPEN" | "APPROVED" | "REJECTED"
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

const expenses: Record<string, Expense> = {}

app.use((req, res, next) => {
  if (!req.headers["user"]) return res.status(403).end();
  req.user = users[req.headers["user"][0]];
  next();
});

app.get("/", (req, res) => {
  res.send("Well done!");
});

// View an expense
app.get('/expenses/:id', (req, res) => {
	const expense = expenses[req.params.id]
	if (!expense) return res.status(404).json({ error: "Expense not found" });
})

// View who approved an expense
app.get('/expenses/:id/approver', (req, res) => {
	const expense = expenses[req.params.id]
	if (!expense) return res.status(404).json({ error: "Expense not found" });

})

// Approve an expense
app.post("/expenses/:id/approve", (req, res) => {
  const expense = expenses[req.params.id]
	if (!expense) return res.status(404).json({ error: "Expense not found" });
  if (
    req.user.roles.includes("FINANCE") &&
    expense.amount < 50000 &&
    expense.ownerId != req.user.id &&
    expense.status === "OPEN"
  ) {
    //do approval
  } else {
    //return error
  }
});

// Update an expense
app.patch('/expenses/:id', (req, res) => {
	const expense = expenses[req.params.id]
	if (!expense) return res.status(404).json({ error: "Expense not found" });
	
})

// Delete an expense
app.delete('/expenses/:id', (req, res) => {
	const expense = expenses[req.params.id]
	if (!expense) return res.status(404).json({ error: "Expense not found" });
	
})

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
