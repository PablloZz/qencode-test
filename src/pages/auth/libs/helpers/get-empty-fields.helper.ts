import { EMPTY_FIELD } from "../constants/constants.ts";
import { AuthValidationMessage } from "../enums/enums.ts";

function getEmptyFields<T extends Record<string, string>>(fields: T) {
  const emptyFieldsKeys = Object.keys(fields).filter(
    field => fields[field] === EMPTY_FIELD
  );

  return emptyFieldsKeys.map(fieldKey => ({
    [fieldKey]: AuthValidationMessage.PROVIDE_ALL_FIELDS,
  })) as T[];
}

export { getEmptyFields };
