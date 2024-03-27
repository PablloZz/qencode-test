import { AuthValidationMessage } from "../enums/enums.ts";

function isProvideFieldErrorExist(errorMessage: string) {
  return errorMessage === AuthValidationMessage.PROVIDE_ALL_FIELDS;
}

export { isProvideFieldErrorExist };
