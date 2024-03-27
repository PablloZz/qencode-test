import { HttpCode } from "../enums/enums.ts";

type Constructor = {
  status: (typeof HttpCode)[keyof typeof HttpCode];
  message: string;
};

class HttpError extends Error {
  public status: (typeof HttpCode)[keyof typeof HttpCode];

  public constructor({ message, status }: Constructor) {
    super(message);

    this.status = status;
  }
}

export { HttpError };
