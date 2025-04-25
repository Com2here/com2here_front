import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/oauth/kakao", async ({ request }) => {
    const { code } = await request.json();
    return HttpResponse.json(
      {
        code: 500,
      },
      { status: 200 },
    );
  }),
];
