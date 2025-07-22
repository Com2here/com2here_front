import { ROUTES } from "../constants/routes";

export const DROPDOWN_MENU = [
  // {
  //   id: "mypage",
  //   label: "내 컴퓨터",
  //   href: ROUTES.MYPAGE,
  // },
  {
    id: "account",
    label: "계정 설정",
    href: ROUTES.ACCOUNT.PROFILE,
  },
  {
    id: "support",
    label: "문의하기",
    href: ROUTES.SUPPORT,
  },
  {
    id: "logout",
    label: "로그아웃",
  },
];

export const ACCOUNT_MENU = [
  {
    id: "profile",
    label: "프로필 편집",
    href: ROUTES.ACCOUNT.PROFILE,
  },
  {
    id: "changePw",
    label: "비밀번호 변경",
    href: ROUTES.ACCOUNT.CHANGE_PW,
  },
  {
    id: "delete",
    label: "계정 삭제",
    href: ROUTES.ACCOUNT.DELETE,
  },
];
