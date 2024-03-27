import { type HttpOptions } from "./types.ts";

interface THttp {
  load(path: string, options: HttpOptions): Promise<Response>;
}

export { type THttp };
