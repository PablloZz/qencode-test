import { HttpApi } from "~/libs/packages/api/api.ts";
import { type THttp } from "~/libs/packages/http/http.ts";
import { ApiPath } from "~/libs/enums/enums.ts";

class Auth extends HttpApi {
  public constructor(baseUrl: string, http: THttp) {
    super({ baseUrl, http, path: ApiPath.AUTH });
  }
}

export { Auth };
