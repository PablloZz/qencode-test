import { EMPTY_FIELD } from "../constants/constants.ts";

function isEmailFilled(email: string) {
  return email !== EMPTY_FIELD;
}

export { isEmailFilled };
