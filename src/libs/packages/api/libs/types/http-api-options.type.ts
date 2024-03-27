import { ContentType } from "~/libs/enums/enums.ts";
import { type HttpOptions } from "~/libs/packages/http/http.ts";

type HttpApiOptions = Omit<HttpOptions, "headers"> & {
  hasAuth: boolean;
  contentType?: (typeof ContentType)[keyof typeof ContentType];
};

export { type HttpApiOptions };
