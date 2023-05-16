import { User, Expense } from "./types";

export const users: Record<string, User> = {
  alan: {
    id: "alan",
    roles: ["ADMIN"],
    attributes: {
      department: "IT",
      region: "EMEA",
    },
  },
  bobby: {
    id: "bobby",
    roles: ["USER"],
    attributes: {
      department: "IT",
      region: "EMEA",
    },
  },
  mike: {
    id: "mike",
    roles: ["USER", "MANAGER"],
    attributes: {
      department: "IT",
      region: "EMEA",
    },
  },
};

export const expenses: Record<string, Expense> = {};