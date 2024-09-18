import { createContext } from "react";
import { User } from "../assets/data";

const defaultUser: User = {
  _id: "",
  first_name: "",
  account_type: "",
  account_number: "",
  account_balance: 0,
  user_role: "",
  token: "",
  transfers: null,
  allUsers: null,
};

export const UserContext = createContext<User>(defaultUser);
