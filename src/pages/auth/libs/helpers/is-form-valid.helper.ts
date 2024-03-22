import { AuthValidationMessage } from "../enums/enums.ts";

function isFormValid<T extends Record<string, string>>(fields: T) {
  return Object.keys(fields).every(
    field => fields[field] === AuthValidationMessage.NO_ERROR
  );
}

export { isFormValid };
