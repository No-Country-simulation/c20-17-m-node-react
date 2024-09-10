import { createContext } from "react";
import { User } from "../assets/data";

const defaultUser: User = {
  id: "",
  first_name: "",
  account_type: "",
  account_number: "",
  account_balance: 0,
  user_role: "",
  token: "",
};

export const UserContext = createContext<User>(defaultUser);
