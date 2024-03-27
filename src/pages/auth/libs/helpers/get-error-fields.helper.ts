import { AuthValidationMessage } from "../enums/enums.ts";

function getErrorFields<T extends Record<string, string>>(fields: T) {
  const errorFieldsKeys = Object.keys(fields).filter(
    field => fields[field] !== AuthValidationMessage.NO_ERROR
  );

  return errorFieldsKeys.map(fieldKey => ({
    [fieldKey]: fields[fieldKey],
  })) as T[];
}

export { getErrorFields };
