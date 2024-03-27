import { config } from "~/libs/packages/config/config.ts";
import { Auth } from "./auth.package.ts";
import { http } from "~/libs/packages/http/http.ts";

const auth = new Auth(config.ENV.API.URL, http, config.ENV.SECRET_TOKEN);

export { auth };
export {
  type LoginRequestDto,
  type LoginResponseDto,
  type ForgotPasswordRequestDto,
  type ForgotPasswordResponseDto,
  type SetNewPasswordRequestDto,
  type SetNewPasswordResponseDto,
} from "./libs/types/types.ts";
