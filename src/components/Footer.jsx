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
                <img src={imgPathInstagram} alt="인스타그램 로고" />
              </li>
              <li>
                <img src={imgPathGithub} alt="깃허브 로고" />
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
              <li>E: support@comhere.com</li>
              <li>Copyright © 2025 컴히얼. All rights reserved.</li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
            <ul>
                <li>팀 소개</li>
                <li>서비스 의견 남기기</li>
                <li>개인정보 처리방침</li>
            </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
