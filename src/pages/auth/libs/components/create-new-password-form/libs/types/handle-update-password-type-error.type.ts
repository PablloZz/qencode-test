import { type CreateNewPasswordFormValues } from "./types.ts";

type HandleUpdatePasswordTypeErrors = {
  errorMessage: string;
  password: string;
  confirmPassword: string;
  passwordFieldType: keyof CreateNewPasswordFormValues;
};

export { type HandleUpdatePasswordTypeErrors };
