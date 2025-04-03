// import { SITE_URL, PAGE_TITLES } from "../constants/constants";

// const ResetPassword = () => {
//   return (
//     <main className="reset-password-container">
//       <Helmet>
//         <title>{PAGE_TITLES.resetPassword}</title>
//         <meta property="og:title" content={PAGE_TITLES.resetPassword} />
//         <meta
//           property="og:url"
//           content={`${SITE_URL}${ROUTES.RESET_PASSWORD}`}
//         />
//         <meta name="twitter:title" content={PAGE_TITLES.resetPassword}></meta>
//         <meta
//           name="twitter:url"
//           content={`${SITE_URL}${ROUTES.RESET_PASSWORD}`}
//         ></meta>
//       </Helmet>

//       <section className="reset-password-left-side">
//         <h2>비밀번호 재설정</h2>

//         {!isCodeSent ? (
//           <form onSubmit={handleSubmitEmail}>
//             <div className="reset-password-input">
//               <input
//                 type="email"
//                 placeholder="가입한 이메일을 입력하세요"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={loading}>
//               {loading ? "로딩 중..." : "이메일 인증 코드 보내기"}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleSubmitPasswordReset}>
//             <div className="reset-password-input">
//               <input
//                 type="text"
//                 placeholder="이메일로 받은 인증 코드를 입력하세요"
//                 value={authCode}
//                 onChange={(e) => setAuthCode(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="reset-password-input">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="새 비밀번호"
//                 value={newPassword}
//                 onChange={handlePasswordChange}
//                 required
//               />
//               {errors.password && (
//                 <span className="reset-password-error">{errors.password}</span>
//               )}
//             </div>
//             <div className="reset-password-input">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="비밀번호 확인"
//                 value={confirmPassword}
//                 onChange={handlePasswordChange}
//                 required
//               />
//               {errors.confirmPassword && (
//                 <span className="reset-password-error">
//                   {errors.confirmPassword}
//                 </span>
//               )}
//             </div>
//             <button type="submit" disabled={loading}>
//               {loading ? "로딩 중..." : "비밀번호 재설정"}
//             </button>
//           </form>
//         )}

//         {message && <div className="reset-password-message">{message}</div>}
//       </section>
//       <section className="reset-password-right-side">
//         <Link to="/">
//           <h1 className="reset-password-logo">
//             <img src={imgPath} alt="컴히얼" />
//           </h1>
//         </Link>
//         <div className="reset-password-description">
//           <p>
//             컴알못에게 가장 쉬운
//             <br />
//             PC추천 플랫폼
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// };
