import {
  type LoginRequestDto,
  type LoginResponseDto,
} from "~/packages/auth/auth.ts";

type LoginContext = {
  user: LoginResponseDto | null;
  loading: boolean;
  handleLogin: (payload: LoginRequestDto) => Promise<void>;
};

export { type LoginContext };
