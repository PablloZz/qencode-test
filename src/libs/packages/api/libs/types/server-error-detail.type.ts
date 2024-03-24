type ServerErrorDetail =
  | {
      loc: (string | number)[];
      msg: string;
      type: string;
    }[]
  | string;

export { type ServerErrorDetail };
