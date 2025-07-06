import { http, HttpResponse } from "msw";

// 프로그램 정보 더미 데이터
const recommendations = [
  {
    id: 1,
    purpose: "게임용",
    mainProgram: "리그 오브 레전드",
    recommendedSpec: "i7-12700K, RTX 3060Ti, 32GB RAM",
    minimumSpec: "i5-10400F, GTX 1660 Super, 16GB RAM",
  },
  {
    id: 2,
    purpose: "영상편집용",
    mainProgram: "Adobe Premiere Pro",
    recommendedSpec: "i9-13900K, RTX 4080, 64GB RAM",
    minimumSpec: "i7-11700K, RTX 3070, 32GB RAM",
  },
  {
    id: 3,
    purpose: "사무용",
    mainProgram: "Microsoft Office",
    recommendedSpec: "i5-12400F, 내장그래픽, 16GB RAM",
    minimumSpec: "i3-10100, 내장그래픽, 8GB RAM",
  },
  {
    id: 4,
    purpose: "3D 모델링",
    mainProgram: "Blender",
    recommendedSpec: "i9-12900K, RTX 4070Ti, 64GB RAM",
    minimumSpec: "i7-10700K, RTX 3060, 32GB RAM",
  },
  {
    id: 5,
    purpose: "스트리밍용",
    mainProgram: "OBS Studio",
    recommendedSpec: "i7-13700K, RTX 4070, 32GB RAM",
    minimumSpec: "i5-11600K, RTX 3060Ti, 16GB RAM",
  },
  {
    id: 6,
    purpose: "게임 개발용",
    mainProgram: "Unreal Engine 5",
    recommendedSpec: "i9-13900K, RTX 4090, 128GB RAM",
    minimumSpec: "i7-12700K, RTX 3080, 64GB RAM",
  },
  {
    id: 7,
    purpose: "음악 작업용",
    mainProgram: "FL Studio",
    recommendedSpec: "i7-13700K, RTX 3060, 64GB RAM",
    minimumSpec: "i5-12600K, GTX 1660 Super, 32GB RAM",
  },
  {
    id: 8,
    purpose: "웹 개발용",
    mainProgram: "Visual Studio Code",
    recommendedSpec: "i5-13600K, 내장그래픽, 32GB RAM",
    minimumSpec: "i3-12100, 내장그래픽, 16GB RAM",
  },
  {
    id: 9,
    purpose: "AI/딥러닝",
    mainProgram: "TensorFlow",
    recommendedSpec: "i9-13900K, RTX 4090 (2개), 256GB RAM",
    minimumSpec: "i9-12900K, RTX 3090, 128GB RAM",
  },
  {
    id: 10,
    purpose: "CAD 설계용",
    mainProgram: "AutoCAD",
    recommendedSpec: "i7-13700K, RTX 4080, 64GB RAM",
    minimumSpec: "i5-12600K, RTX 3070, 32GB RAM",
  },
  {
    id: 11,
    purpose: "포토샵 작업용",
    mainProgram: "Adobe Photoshop",
    recommendedSpec: "i7-13700K, RTX 3070, 32GB RAM",
    minimumSpec: "i5-12400F, GTX 1660 Super, 16GB RAM",
  },
  {
    id: 12,
    purpose: "일러스트 작업용",
    mainProgram: "Adobe Illustrator",
    recommendedSpec: "i7-13700K, RTX 3060Ti, 32GB RAM",
    minimumSpec: "i5-12400F, GTX 1660, 16GB RAM",
  },
  {
    id: 13,
    purpose: "애프터이펙트 작업용",
    mainProgram: "Adobe After Effects",
    recommendedSpec: "i9-13900K, RTX 4080, 128GB RAM",
    minimumSpec: "i7-12700K, RTX 3070Ti, 64GB RAM",
  },
  {
    id: 14,
    purpose: "가상화/서버용",
    mainProgram: "VMware/Docker",
    recommendedSpec: "i9-13900K, RTX 3060, 128GB RAM",
    minimumSpec: "i7-12700K, 내장그래픽, 64GB RAM",
  },
  {
    id: 15,
    purpose: "메타버스 개발용",
    mainProgram: "Unity",
    recommendedSpec: "i9-13900K, RTX 4080, 64GB RAM",
    minimumSpec: "i7-12700K, RTX 3070, 32GB RAM",
  },
];

// 테스트용 사용자 데이터
const testUsers = [
  {
    email: "unverified@test.com",
    password: "password123",
    nickname: "미인증사용자",
    role: "USER",
    is_email_verified: 0,
  },
  {
    email: "verified@test.com",
    password: "password123",
    nickname: "인증된사용자",
    role: "USER",
    is_email_verified: 1,
  },
];

const filterRecommendations = (items, searchTerm, filterBy) => {
  let filtered = [...items];

  if (filterBy && filterBy !== "all") {
    const filterMap = {
      gaming: ["게임용", "게임 개발용", "스트리밍용"],
      work: [
        "영상편집용",
        "음악 작업용",
        "3D 모델링",
        "CAD 설계용",
        "포토샵 작업용",
        "일러스트 작업용",
        "애프터이펙트 작업용",
      ],
      office: ["사무용", "웹 개발용"],
      development: [
        "게임 개발용",
        "웹 개발용",
        "AI/딥러닝",
        "가상화/서버용",
        "메타버스 개발용",
      ],
    };

    filtered = filtered.filter((item) =>
      filterMap[filterBy]?.some((category) => item.purpose.includes(category)),
    );
  }

  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.purpose.toLowerCase().includes(search) ||
        item.mainProgram.toLowerCase().includes(search) ||
        item.recommendedSpec.toLowerCase().includes(search) ||
        item.minimumSpec.toLowerCase().includes(search),
    );
  }

  return filtered;
};

export const handlers = [
  // 로그인 API
  http.post("/api/v1/user/login", async ({ request }) => {
    const { email, password } = await request.json();

    // 테스트용 사용자 찾기
    const user = testUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return HttpResponse.json(
        {
          code: 4001,
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "로그인 성공",
        data: {
          accessToken: "mock_access_token_" + user.email,
          refreshToken: "mock_refresh_token_" + user.email,
          nickname: user.nickname,
          email: user.email,
          role: user.role,
          is_email_verified: user.is_email_verified,
        },
      },
      { status: 200 },
    );
  }),

  // 이메일 인증 코드 전송 API
  http.post("/api/v1/email/authcode", async ({ request }) => {
    const { mail } = await request.json();

    // 테스트용 사용자 확인
    const user = testUsers.find((u) => u.email === mail);

    if (!user) {
      return HttpResponse.json(
        {
          code: 4001,
          message: "존재하지 않는 이메일입니다.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "인증 코드가 이메일로 전송되었습니다.",
        data: {
          authCode: "123456", // 테스트용 고정 코드
        },
      },
      { status: 200 },
    );
  }),

  // 이메일 인증 코드 확인 API
  http.post("/api/v1/email/verify", async ({ request }) => {
    const { mail, verifyCode } = await request.json();

    // 테스트용 사용자 확인
    const user = testUsers.find((u) => u.email === mail);

    if (!user) {
      return HttpResponse.json(
        {
          code: 4001,
          message: "존재하지 않는 이메일입니다.",
        },
        { status: 400 },
      );
    }

    // 테스트용 고정 코드 확인
    if (verifyCode === "123456") {
      // 인증 성공 시 사용자 상태 업데이트
      user.is_email_verified = 1;

      return HttpResponse.json(
        {
          code: 200,
          message: "이메일 인증이 완료되었습니다.",
          data: null,
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(
        {
          code: 4002,
          message: "인증 코드가 일치하지 않습니다.",
        },
        { status: 400 },
      );
    }
  }),

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

  // 추천 정보 목록 조회 (검색, 필터링, 페이지네이션 지원)
  http.get("/api/recommendations", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 5;
    const searchTerm = url.searchParams.get("search") || "";
    const filterBy = url.searchParams.get("filter") || "all";

    // Apply filters and search
    const filteredItems = filterRecommendations(
      recommendations,
      searchTerm,
      filterBy,
    );

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredItems.length / limit);

    return HttpResponse.json(
      {
        code: 200,
        message: "추천 정보 조회 성공",
        data: {
          items: paginatedItems,
          currentPage: page,
          totalPages: totalPages,
          totalItems: filteredItems.length,
          itemsPerPage: limit,
        },
      },
      { status: 200 },
    );
  }),

  // 추천 정보 등록
  http.post("/api/recommendations", async ({ request }) => {
    const newRec = await request.json();

    // 입력값 검증
    if (
      !newRec.purpose ||
      !newRec.mainProgram ||
      !newRec.recommendedSpec ||
      !newRec.minimumSpec
    ) {
      return HttpResponse.json(
        {
          code: 400,
          message: "잘못된 요청 (필수 값 누락 또는 잘못된 입력)",
          data: null,
        },
        { status: 400 },
      );
    }

    const recommendation = {
      id: recommendations.length + 1,
      ...newRec,
    };

    recommendations.push(recommendation);

    return HttpResponse.json(
      {
        code: 201,
        message: "추천 항목이 성공적으로 등록되었습니다.",
        data: recommendation,
      },
      { status: 201 },
    );
  }),

  // 추천 정보 수정
  http.put("/api/recommendations/:id", async ({ params, request }) => {
    const { id } = params;
    const updateData = await request.json();

    const index = recommendations.findIndex((rec) => rec.id === Number(id));

    if (index === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: "해당 추천 정보를 찾을 수 없습니다.",
          data: null,
        },
        { status: 404 },
      );
    }

    // 입력값 검증
    if (
      !updateData.purpose ||
      !updateData.mainProgram ||
      !updateData.recommendedSpec ||
      !updateData.minimumSpec
    ) {
      return HttpResponse.json(
        {
          code: 400,
          message: "잘못된 요청 (필수 값 누락 또는 잘못된 입력)",
          data: null,
        },
        { status: 400 },
      );
    }

    recommendations[index] = {
      ...recommendations[index],
      ...updateData,
    };

    return HttpResponse.json(
      {
        code: 200,
        message: "추천 정보가 성공적으로 수정되었습니다.",
        data: recommendations[index],
      },
      { status: 200 },
    );
  }),

  // 추천 정보 삭제
  http.delete("/api/recommendations/:id", ({ params }) => {
    const { id } = params;
    const index = recommendations.findIndex((rec) => rec.id === Number(id));

    if (index === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: "해당 추천 정보를 찾을 수 없습니다.",
          data: null,
        },
        { status: 404 },
      );
    }

    recommendations.splice(index, 1);

    return HttpResponse.json(
      {
        code: 200,
        message: "추천 정보가 성공적으로 삭제되었습니다.",
        data: null,
      },
      { status: 200 },
    );
  }),
];
