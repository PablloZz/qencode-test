import { type LoginRequestDto } from "~/packages/auth/auth.ts";

const INITIAL_LOGIN_FORM_VALUES: LoginRequestDto = {
  email: "",
  password: "",
};

export { INITIAL_LOGIN_FORM_VALUES };
