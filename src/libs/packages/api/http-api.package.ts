import { ContentType, StorageKey } from "~/libs/enums/enums.ts";
import { DEFAULT_ERROR_MESSAGE } from "~/libs/constants/constants.ts";
import { HttpCode, HttpError, HttpHeader, type THttp } from "../http/http.ts";
import {
  type HttpApiOptions,
  type THttpApi,
  type ServerErrorResponse,
  type ServerErrorDetailError,
  type ServerErrorDetailInfo,
} from "./libs/types/types.ts";

type Constructor = {
  baseUrl: string;
  path: string;
  http: THttp;
};

class HttpApi implements THttpApi {
  private baseUrl: string;

  private path: string;

  private http: THttp;

  public constructor({ baseUrl, path, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.path = path;
    this.http = http;
  }

  public async load(path: string, options: HttpApiOptions): Promise<Response> {
    const { method, contentType, payload, hasAuth } = options;

    const headers = await this.getHeaders(hasAuth, contentType);

    const response = await this.http.load(path, {
      method,
      headers,
      payload,
    });

    return await this.checkResponse(response);
  }

  protected getFullEndpoint(...parameters: [...string[]]): string {
    const endpointParts = [this.baseUrl, this.path, ...parameters];

    return endpointParts.join("");
  }

  private async getHeaders(
    hasAuth: boolean,
    contentType?: (typeof ContentType)[keyof typeof ContentType]
  ): Promise<Headers> {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = window.localStorage.getItem(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token ?? ""}`);
    }

    return headers;
  }

  private async checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      await this.handleError(response);
    }

    return response;
  }

  private async handleError(response: Response): Promise<never> {
    let parsedException: ServerErrorResponse;
    let errorMessage = "";

    try {
      parsedException = await response.json();
    } catch {
      parsedException = { detail: response.statusText };
    }

    const { detail } = parsedException;
    if (typeof detail === "string") {
      errorMessage = detail;
    }

    if (Array.isArray(detail) && detail.every(d => d.hasOwnProperty("error"))) {
      errorMessage = detail
        .map(d => (d as ServerErrorDetailError).error)
        .join("\n");
    }

    if (
      Array.isArray(detail) &&
      detail.every(msg => msg.hasOwnProperty("msg"))
    ) {
      errorMessage = detail
        .map(d => (d as ServerErrorDetailInfo).msg)
        .join("\n");
    }

    if (!errorMessage) {
      errorMessage = DEFAULT_ERROR_MESSAGE;
    }

    throw new HttpError({
      message: errorMessage,
      status: response.status as (typeof HttpCode)[keyof typeof HttpCode],
    });
  }
}

export { HttpApi };
