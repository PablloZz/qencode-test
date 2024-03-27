import {
  type SetNewPasswordRequestDto,
  type SetNewPasswordResponseDto,
} from "~/packages/auth/auth.ts";

type SetNewPasswordContext = {
  setNewPasswordDetail: SetNewPasswordResponseDto | null;
  loading: boolean;
  handleSetNewPassword: (payload: SetNewPasswordRequestDto) => Promise<void>;
};

export { type SetNewPasswordContext };
