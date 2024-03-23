import { CreateNewPasswordFormValidationMessage } from "../enums/enums.ts";
import { isPasswordsMatch } from "./helpers.ts";

function shouldRemoveMismatchError(
  passwordError: string,
  password: string,
  confirmPassword: string
) {
  return (
    passwordError ===
      CreateNewPasswordFormValidationMessage.PASSWORDS_MISMATCH &&
    isPasswordsMatch(password, confirmPassword)
  );
}

export { shouldRemoveMismatchError };
