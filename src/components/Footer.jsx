import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const imgPathLogo = "/images/logo-bg.png";
  const imgPathInstagram = "/images/Instagram-logo.svg";
  const imgPathGithub = "/images/github-logo.svg";
  const imgPathNotion = "/images/notion-logo.svg";

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/">
            <img src={imgPathLogo} alt="컴히얼 로고" />
          </Link>
          <div className="footer-left-content">
            <ul className="footer-socials">
              <li>
                <Link to="https://www.instagram.com/comhereplz">
                  <img src={imgPathInstagram} alt="인스타그램 로고" />
                </Link>
              </li>
              <li>
                <Link to="https://github.com/Com2here">
                  <img src={imgPathGithub} alt="깃허브 로고" />
                </Link>
              </li>
              <li>
                <img
                  className="footer-notion"
                  src={imgPathNotion}
                  alt="노션 로고"
                />
              </li>
            </ul>
            <ul className="footer-info">
              <Link to="mailto:support@comhere.com">
                <li>E: support@comhere.com</li>
              </Link>
              <li>Copyright © 2025 컴히얼. All rights reserved.</li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <ul>
            <li>팀 소개</li>
            <Link to="https://forms.gle/Hvyjjy2dfuG5Uaz69">
              <li>서비스 의견 남기기</li>
            </Link>
            <li>개인정보 처리방침</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
