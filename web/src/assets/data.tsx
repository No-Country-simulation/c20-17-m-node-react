export interface User {
  _id: string | null;
  first_name: string | null;
  account_type: string | null;
  user_role: string | null;
  account_balance: number | null;
  account_number: string | null;
  token: string | null;
  transfers: transferences[] | null;
  allUsers: AdminUser[] | null;
}

interface transferences {
  _id: string;
  receptor: {
    receptorId: string;
    firstname: string;
    lastname: string;
  };
  mount: number;
  emisor: {
    emisorId: string;
    firstname: string;
    lastname: string;
  };
  createdAt: string;
}

export interface searchedUser {
  data: {
    _id: string;
    first_name: string;
    last_name: string;
    account_number: string;
  };
}

export interface AdminUser {
  _id: string;
  first_name: string;
  last_name: string;
  account_number: string;
  alias: string;
}
