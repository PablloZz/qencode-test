import { ContentType, HttpHeader } from "~/libs/enums/enums.ts";
import { HttpCode, HttpError, type THttp } from "../http/http.ts";
import {
  type HttpApiOptions,
  type THttpApi,
  type ServerErrorResponse,
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
    const { method, contentType, payload } = options;

    const headers = await this.getHeaders(contentType);

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
    contentType?: (typeof ContentType)[keyof typeof ContentType]
  ): Promise<Headers> {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
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

    if (Array.isArray(detail)) {
      errorMessage = detail.map(d => d.msg).join("\n");
    }

    throw new HttpError({
      message: errorMessage,
      status: response.status as (typeof HttpCode)[keyof typeof HttpCode],
    });
  }
}

export { HttpApi };
