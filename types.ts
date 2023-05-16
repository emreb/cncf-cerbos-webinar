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
    department: string;
    region?: string;
  };
}

export interface Expense {
  id: string;
  attributes: {
    amount: number;
    ownerId: string;
    status: "OPEN" | "APPROVED" | "REJECTED";
  };
}