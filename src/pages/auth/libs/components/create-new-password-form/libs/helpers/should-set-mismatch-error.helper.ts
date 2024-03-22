import { EMPTY_FIELD } from "~/pages/auth/auth.tsx";
import { isPasswordsMatch } from "./helpers.ts";

function shouldSetMismatchError(password: string, adjacentPassword: string) {
  return (
    !isPasswordsMatch(password, adjacentPassword) &&
    adjacentPassword !== EMPTY_FIELD
  );
}

export { shouldSetMismatchError };
