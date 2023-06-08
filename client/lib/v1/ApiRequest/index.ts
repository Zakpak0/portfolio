export class ApiRequest {
  private baseUrl = "http://192.168.1.16:3000/api/v1/";
  private url: URL;
  private method: string;
  private body: Record<string, unknown> = {};
  public makeRequest(): Promise<Response> {
    return fetch(this.url, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
      },
      ...this.body,
    });
  }
  constructor(options: ApiRequestOptions) {
    const { route, params, body, method } = options;
    const url = new URL(this.baseUrl + route);
    this.url = url;
    if (params) {
      Object.keys(params).forEach((key) =>
        this.url.searchParams.append(key, params[key])
      );
    }
    if (body) {
      this.body = { body: JSON.stringify(body) };
    }
    this.method = method;
  }
}
export enum ApiRoutes {
  dictionary = "dictionary",
}

export type ApiRoute = keyof typeof ApiRoutes;

export type ApiRequestOptions = {
  route: ApiRoute;
  params?: Record<string, string>;
  body?: Record<string, unknown>;
  method: "GET" | "POST" | "PUT" | "DELETE";
};
