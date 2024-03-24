import { type HttpApiOptions } from "./types.js";

type THttpApi = {
  load(path: string, options: HttpApiOptions): Promise<Response>;
};

export { type THttpApi };
