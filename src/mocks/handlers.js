import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/user/register", async ({ request }) => {
    const { nickname, email, password, confirmPassword } = await request.json();

    // 이미 가입된 이메일 테스트 케이스
    if (email === "test1@example.com") {
      return HttpResponse.json(
        {
          code: 500,
        },
        { status: 200 },
      );
    }
  }),
];
