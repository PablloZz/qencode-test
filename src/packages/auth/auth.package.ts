import { HttpApi } from "~/libs/packages/api/api.ts";
import { type THttp } from "~/libs/packages/http/http.ts";
import { ApiPath, ContentType, StorageKey } from "~/libs/enums/enums.ts";
import { AuthApiPath } from "./libs/enums/enums.ts";
import {
  type LoginResponseDto,
  type LoginRequestDto,
  type ForgotPasswordResponseDto,
  type ForgotPasswordRequestDto,
  type SetNewPasswordRequestDto,
  type SetNewPasswordResponseDto,
} from "./libs/types/types.ts";

class Auth extends HttpApi {
  private secretToken: string;

  public constructor(baseUrl: string, http: THttp, secretToken: string) {
    super({ baseUrl, http, path: ApiPath.AUTH });

    this.secretToken = secretToken;
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

  public async setNewPassword(
    payload: SetNewPasswordRequestDto
  ): Promise<SetNewPasswordResponseDto> {
    const token = window.localStorage.getItem(StorageKey.TOKEN) ?? "";
    const fullPayload = {
      ...payload,
      token,
      secret: this.secretToken,
    };
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SET_NEW_PASSWORD),
      {
        method: "POST",
        contentType: ContentType.JSON,
        payload: JSON.stringify(fullPayload),
        hasAuth: true,
      }
    );
    const { detail } = await response.json();

    return { detail };
  }

  public async refreshToken(payload: string): Promise<LoginResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SET_NEW_PASSWORD),
      {
        method: "POST",
        contentType: ContentType.JSON,
        payload: JSON.stringify({ refresh_token: payload }),
        hasAuth: false,
      }
    );
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
}

export { Auth };
