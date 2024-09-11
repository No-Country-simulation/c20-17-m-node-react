export interface User {
  _id: string | null;
  first_name: string | null;
  account_type: string | null;
  user_role: string | null;
  account_balance: number | null;
  account_number: string | null;
  token: string | null;
  transfers: transferences[] | null;
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
