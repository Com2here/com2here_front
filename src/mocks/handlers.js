import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/v1/user/show", () => {
    // const { code } = await request.json();
    return HttpResponse.json(
      {
        code: 401,
      },
      { status: 400 },
    );
  }),
];
