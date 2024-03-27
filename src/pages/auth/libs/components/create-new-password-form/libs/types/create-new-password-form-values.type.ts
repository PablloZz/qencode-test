import { type SetNewPasswordRequestDto } from "~/packages/auth/auth.ts";

type CreateNewPasswordFormValues = SetNewPasswordRequestDto & {
  confirmPassword: string;
};

export { type CreateNewPasswordFormValues };
