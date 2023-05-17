declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export interface User {
  id: string;
  roles: ("USER" | "ADMIN" | "MANAGER")[];
  attributes: {
    department: "FINANCE" | "IT" | "SALES";
    region?: string;
  };
}

export interface Expense {
  id: string;
  attributes: {
    amount: number;
    ownerId: string;
    status: "OPEN" | "APPROVED" | "REJECTED";
    createdAt: string,
    region: "EMEA" | "NA",
    vendor: string
    approvedBy?: string
  };
}