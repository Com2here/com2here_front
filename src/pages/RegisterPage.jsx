import "./RegisterPage.css";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="page">
      <div className="register-form-left-side">
        <div className="titleWrap">회원가입</div>
        <RegisterForm />
      </div>
      <div className="register-form-right-side">
        <img src="https://img.freepik.com/free-photo/side-view-man-using-computer-home_23-2148793445.jpg?t=st=1740304818~exp=1740308418~hmac=d156a9e01539e382dfa43607d14f582b60e86cb165e392379170bb143e508e1c&w=2000" />
      </div>
    </div>
  );
};

export default RegisterPage;
