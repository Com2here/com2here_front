import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/user/register", () => {
    return new HttpResponse(
      JSON.stringify({ message: "이미 존재하는 사용자입니다." }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }),
];
