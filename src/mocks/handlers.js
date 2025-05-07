import { http, HttpResponse } from "msw";

export const handlers = [
  http.delete("/api/v1/user/delete", async ({ request }) => {
    const { password } = await request.json();

    if (password === "correct_password") {
      return HttpResponse.json(
        { code: 2002, message: "계정 삭제 성공" },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      { code: 401, message: "비밀번호 불일치" },
      { status: 400 },
    );
  }),
];
