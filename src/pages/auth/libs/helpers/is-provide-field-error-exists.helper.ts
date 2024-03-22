import { AuthValidationMessage } from "../enums/enums.ts";

function isProvideFieldsErrorExist(errorMessage: string) {
  return errorMessage === AuthValidationMessage.PROVIDE_ALL_FIELDS;
}

export { isProvideFieldsErrorExist };
