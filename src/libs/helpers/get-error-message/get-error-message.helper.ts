import { HttpError } from "~/libs/packages/http/http.ts";
import { DEFAULT_ERROR_MESSAGE } from "./libs/constants/constants.ts";

function getErrorMessage(error: unknown) {
  console.dir(error)
  let message = DEFAULT_ERROR_MESSAGE;

  if (error instanceof Error || error instanceof HttpError) {
    message = error.message;
  }
  
  return message;
}

export { getErrorMessage };
