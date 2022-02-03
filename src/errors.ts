import { Response } from "node-fetch";

export class TimelyError extends Error {
  res?: Response;

  constructor(message: string, res: Response) {
    super(message);

    Object.setPrototypeOf(this, TimelyError.prototype);

    this.res = res;
  }
}
