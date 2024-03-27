import { config } from "~/libs/packages/config/config.ts";
import { Auth } from "./auth.package.ts";
import { http } from "~/libs/packages/http/http.ts";

const auth = new Auth(config.ENV.API.URL, http);

export { auth };
export {
  type LoginRequestDto,
  type LoginResponseDto,
  type ForgotPasswordRequestDto,
  type ForgotPasswordResponseDto,
} from "./libs/types/types.ts";
