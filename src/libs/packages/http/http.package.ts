import { type THttp, type HttpOptions } from "./libs/types/types.js";

class Http implements THttp {
  public load(path: string, options: HttpOptions): Promise<Response> {
    const { method, payload, headers } = options;

    return fetch(path, {
      method,
      headers,
      body: payload,
    });
  }
}

export { Http };
