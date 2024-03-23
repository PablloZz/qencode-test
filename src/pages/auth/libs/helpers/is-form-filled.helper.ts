import { EMPTY_FIELD } from "../constants/constants.ts";

function isFormFilled<T extends Record<string, string>>(fields: T) {
  return Object.keys(fields).every(field => fields[field] !== EMPTY_FIELD);
}

export { isFormFilled };
