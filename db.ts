import { User, Expense } from "./types";

export const users: Record<string, User> = {
  "sally": {
    "id": "sally",
    "roles": [
      "USER"
    ],
    "attributes": {
      "department": "SALES",
      "region": "EMEA"
    }
  },
  "ian": {
    "id": "ian",
    "roles": [
      "ADMIN"
    ],
    "attributes": {
      "department": "IT"
    }
  },
  "frank": {
    "id": "frank",
    "roles": [
      "USER"
    ],
    "attributes": {
      "department": "FINANCE",
      "region": "EMEA"
    }
  },
  "simon": {
    "id": "simon",
    "roles": [
      "USER",
      "MANAGER"
    ],
    "attributes": {
      "department": "SALES",
      "region": "NA"
    }
  },
  "mark": {
    "id": "mark",
    "roles": [
      "USER",
      "MANAGER"
    ],
    "attributes": {
      "department": "SALES",
      "region": "EMEA"
    }
  },
  "sydney": {
    "id": "sydney",
    "roles": [
      "USER"
    ],
    "attributes": {
      "department": "SALES",
      "region": "NA"
    }
  },
  "derek": {
    "id": "derek",
    "roles": [
      "USER",
      // "MANAGER"
    ],
    "attributes": {
      "department": "FINANCE",
      "region": "EMEA"
    }
  }
};

export const expenses: Record<string, Expense> = {
  "expense1": {
    "id": "expense1",
    "attributes": {
      "ownerId": "sally",
      "createdAt": "2021-10-01T10:00:00.021-05:00",
      "vendor": "Flux Water Gear",
      "region": "EMEA",
      "amount": 500,
      "status": "OPEN"
    }
  },
  "expense2": {
    "id": "expense2",
    "attributes": {
      "ownerId": "sally",
      "createdAt": "2021-10-01T10:00:00.021-05:00",
      "vendor": "Vortex Solar",
      "region": "EMEA",
      "amount": 2500,
      "status": "APPROVED",
      "approvedBy": "frank"
    }
  },
  "expense3": {
    "id": "expense3",
    "attributes": {
      "ownerId": "sally",
      "createdAt": "2021-10-01T10:00:00.021-05:00",
      "vendor": "Global Airlines",
      "region": "EMEA",
      "amount": 80000,
      "status": "OPEN"
    }
  },
  "expense4": {
    "id": "expense4",
    "attributes": {
      "ownerId": "frank",
      "createdAt": "2021-10-01T10:00:00.021-05:00",
      "vendor": "Vortex Solar",
      "region": "EMEA",
      "amount": 2421,
      "status": "OPEN"
    }
  },
  "expense5": {
    "id": "expense5",
    "attributes": {
      "ownerId": "sally",
      "createdAt": "2021-10-01T10:00:00.021-05:00",
      "vendor": "Vortex Solar",
      "region": "EMEA",
      "amount": 2500,
      "status": "REJECTED",
      "approvedBy": "frank"
    }
  }
};