import { HttpApi } from "~/libs/packages/api/api.ts";
import { type THttp } from "~/libs/packages/http/http.ts";
import { ApiPath, ContentType } from "~/libs/enums/enums.ts";
import { AuthApiPath } from "./libs/enums/enums.ts";
import {
  type LoginResponseDto,
  type LoginRequestDto,
  type ForgotPasswordResponseDto,
  type ForgotPasswordRequestDto,
} from "./libs/types/types.ts";

class Auth extends HttpApi {
  public constructor(baseUrl: string, http: THttp) {
    super({ baseUrl, http, path: ApiPath.AUTH });
  }

  public async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await this.load(this.getFullEndpoint(AuthApiPath.LOGIN), {
      method: "POST",
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
      hasAuth: false,
    });
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_expire: tokenExpire,
      refresh_token_expire: refreshTokenExpire,
    } = await response.json();

    return {
      accessToken,
      refreshToken,
      tokenExpire,
      refreshTokenExpire,
    };
  }

  public async resetPassword(
    payload: ForgotPasswordRequestDto
  ): Promise<ForgotPasswordResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.RESET_PASSWORD),
      {
        method: "POST",
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      }
    );
    const { detail } = await response.json();

    return { detail };
  }
}

export { Auth };
