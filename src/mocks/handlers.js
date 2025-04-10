import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/email/password/reset", async ({ request }) => {
    const { mail, code, password, confirmPassword } = await request.json();

    if (
      mail === "test@example.com" &&
      code === "123456" &&
      password === "pw12345!" &&
      confirmPassword === "pw12345!"
    ) {
      return HttpResponse.json(
        {
          code: 501,
          message: "비밀번호가 성공적으로 변경되었습니다.",
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
