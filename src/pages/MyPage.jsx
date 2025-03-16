import SideBar from "../components/Sidebar";
import { Link } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="myPage">
      <section className="myPage-location">
        <div className="myPage-inner-wrap">
          <div className="myPage-location-text">
            Home &gt; <Link to="/mypage">나의 컴퓨터</Link>
          </div>
        </div>
      </section>

      <div className="myPage-inner-wrap">
        <div className="container">
          <SideBar />
          <div className="mypage-contents">
            <main className="mycomputer">
              <section className="mycomputer-info">user-info</section>
              <div className="mycomputer-container">
                <section className="mycomputer-favor">user-favor</section>
                <section className="mycomputer-need">user-need</section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
