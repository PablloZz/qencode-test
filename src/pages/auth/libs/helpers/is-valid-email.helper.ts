import { EMPTY_FIELD } from "../constants/constants.ts";
import { AuthValidationMessage } from "../enums/enums.ts";

function isValidEmail(errorMessage: string, email: string) {
  return (
    errorMessage === AuthValidationMessage.NO_ERROR && email !== EMPTY_FIELD
  );
}

export { isValidEmail };
