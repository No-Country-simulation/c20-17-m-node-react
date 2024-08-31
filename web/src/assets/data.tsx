interface Cuenta {
  id: number;
  type: string;
  number: string;
  monto: number;
}

interface User {
  id: string;
  type: string;
  name: string;
  lastname?: string;
  phone: string;
  email: string;
  password: string;
  state: boolean;
  cuentas?: Cuenta[];
}

const users: User[] = [
  {
    id: "70342458",
    type: "persona",
    name: "Kurt",
    lastname: "Angeles Segura",
    phone: "+51 947645083",
    email: "kurt@gmail.com",
    password: "1234",
    state: true,
    cuentas: [
      {
        id: 1,
        type: "ahorro",
        number: "4557 8813 2288 0735",
        monto: 500,
      },
    ],
  },
  {
    id: "20552103816",
    type: "empresa",
    name: "GameFreak",
    lastname: "S.A.",
    phone: "+51 986547852",
    email: "gamefreak@gamefreak.com",
    password: "pikapika",
    state: true,
    cuentas: [
      {
        id: 1,
        type: "corriente",
        number: "7563 5684 8965 8657",
        monto: 70698.5,
      },
    ],
  },
  {
    id: "1",
    type: "admin",
    name: "admin",
    phone: "admin",
    password: "admin",
    email: "admin@admin",
    state: true,
  },
];

export default users;
