import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/user/register", () => {
    return new HttpResponse(
      JSON.stringify({ message: "이미 존재하는 사용자입니다." }),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }),

  http.post("/api/v1/user/login", async ({ request }) => {
    const { email, password } = await request.json();

    // 임시 로그인 검증 (예시 데이터)
    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json(
        {
          token: "mock_jwt_token_12345",
          user: {
            id: 1,
            email: "test@example.com",
            name: "테스트 사용자",
            profileImage: "https://via.placeholder.com/150",
          },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      { message: "이메일 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 },
    );
  }),
];
