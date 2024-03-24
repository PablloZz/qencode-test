import { HttpApi } from "~/libs/packages/api/api.ts";
import { type THttp } from "~/libs/packages/http/http.ts";
import { ApiPath, ContentType } from "~/libs/enums/enums.ts";
import { AuthApiPath } from "./libs/enums/enums.ts";
import { type LoginRequestDto } from "./libs/types/types.ts";

class Auth extends HttpApi {
  public constructor(baseUrl: string, http: THttp) {
    super({ baseUrl, http, path: ApiPath.AUTH });
  }

  public async login(payload: LoginRequestDto) {
    const response = await this.load(this.getFullEndpoint(AuthApiPath.LOGIN), {
      method: "POST",
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });

    return await response.json();
  }
}

export { Auth };
