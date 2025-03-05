import "./HomePage.css";

const HomePage = () => {
  const imgPathPc = "/images/pc.svg";
  const imgPathLaptop = "/images/laptop.svg";

  return (
    <main className="home-page">
      <section className="home-cover">
        <h2 className="home-cover-text">
          컴퓨터/노트북 추천은 여기서
          <br />
          Com, here!
        </h2>
        <div className="home-btn-wrapper">
          <div className="home-rec-wrapper">
            <img className="home-img" src={imgPathPc} alt="컴퓨터" />
            <button className="home-btn-rec">컴퓨터 고르기</button>
          </div>
          <div className="home-rec-wrapper">
            <img className="home-img" src={imgPathLaptop} alt="노트북" />
            <button className="home-btn-rec">노트북 고르기</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
