import {
  type ForgotPasswordRequestDto,
  type ForgotPasswordResponseDto,
} from "~/packages/auth/auth.ts";

type ForgotPasswordContext = {
  resetDetail: ForgotPasswordResponseDto | null;
  loading: boolean;
  handleResetPassword: (payload: ForgotPasswordRequestDto) => Promise<void>;
};

export { type ForgotPasswordContext };
