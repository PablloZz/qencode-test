import { isEnoughCharacters } from "./helpers.ts";
import { AuthValidationMessage } from "../enums/enums.ts";

function shouldRemoveMinLengthError(
  passwordError: string,
  passwordLength: number
) {
  return (
    passwordError === AuthValidationMessage.TOO_SHORT_PASSWORD &&
    isEnoughCharacters(passwordLength)
  );
}

export { shouldRemoveMinLengthError };
