import { Http } from "./http.package.js";

const http = new Http();

export { http };
export { HttpCode } from "./libs/enums/enums.js";
export { HttpError } from "./libs/exceptions/exceptions.js";
export { type THttp, type HttpOptions } from "./libs/types/types.js";
