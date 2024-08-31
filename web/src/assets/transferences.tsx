interface transferences {
  id: number;
  cuentato: string;
  cuentafrom: string;
  monto: number;
  date: Date;
}

export const transferences: transferences[] = [
  {
    id: 1,
    cuentato: "7563 5684 8965 8657",
    cuentafrom: "4557 8813 2288 0735",
    monto: 1500,
    date: new Date("2024-08-28"),
  },
  {
    id: 2,
    cuentato: "4557 8813 2288 0735",
    cuentafrom: "7563 5684 8965 8657",
    monto: 500,
    date: new Date("2024-08-29"),
  },
  {
    id: 3,
    cuentato: "4557 8813 2288 0735",
    cuentafrom: "7563 5684 8965 8657",
    monto: 700,
    date: new Date("2024-08-30"),
  },
];
