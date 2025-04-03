// const FindPassword = () => {
//   return (
//     <div className="find-password">
//       <h2>비밀번호 찾기</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="find-password-input-container">
//           <input
//             type="email"
//             placeholder="이메일을 입력하세요"
//             value={mail}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button
//           className="find-password-submit-btn"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "로딩 중..." : "이메일 보내기"}
//         </button>
//       </form>
//       {message && <p className="message">{message}</p>}

//       {/* 이메일 인증이 완료되면 비밀번호 재설정 폼을 보여줌 */}
//       {isEmailSent && (
//         <div className="reset-password-container">
//           <h3>새로운 비밀번호 설정</h3>
//           <form onSubmit={handleResetPassword}>
//             <div className="find-password-input-container">
//               <input type="password" placeholder="새로운 비밀번호" required />
//             </div>
//             <div className="find-password-input-container">
//               <input type="password" placeholder="비밀번호 확인" required />
//             </div>
//             <button
//               className="find-password-submit-btn"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "로딩 중..." : "비밀번호 재설정"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };
