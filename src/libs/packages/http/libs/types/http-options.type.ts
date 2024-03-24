import { type HttpMethod } from "./types.js";

type HttpOptions = {
  method: HttpMethod;
  payload?: BodyInit | null;
  headers: Headers;
};

export { type HttpOptions };
