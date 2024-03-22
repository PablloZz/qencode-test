import { MIN_PASSWORD_LENGTH } from "../constants/constants.ts";

function isEnoughCharacters(passwordLength: number) {
  return passwordLength >= MIN_PASSWORD_LENGTH;
}

export { isEnoughCharacters };
