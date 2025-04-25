import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/v1/oauth/kakao", () => {
    return HttpResponse.json(
      {
        code: 500,
        data: "https://mocked-kakao-auth-url.com",
      },
      { status: 200 }
    );
  }),
];
