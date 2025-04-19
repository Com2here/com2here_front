import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Range } from "react-range";

import { SITE_URL, PAGE_TITLES } from "../constants/constants";
import { ROUTES } from "../constants/routes";
import "../styles/EstimatePage.css";

const PROGRAMS = {
  게임: ["리그오브레전드", "발로란트", "FC 24", "배틀그라운드", "서든어택"],
  "영상 및 그래픽": [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe Premiere Pro",
    "FreeCAD",
    "Autodesk Maya",
    "Unreal Engine",
    "DaVinci Resolve",
    "Blender",
  ],
  사무용: [
    "Microsoft Office",
    "한글",
    "Excel",
    "PowerPoint",
    "Adobe Acrobat",
    "Slack",
    "Zoom",
  ],
  개발: [
    "Visual Studio Code",
    "IntelliJ IDEA",
    "Android Studio",
    "Unity",
    "Unreal Engine",
    "Docker",
    "PyCharm",
  ],
};

const EstimatePage = () => {
  const [budgetRange, setBudgetRange] = useState([100, 2000]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleProgramSelect = (program) => {
    setSelectedPrograms((prev) => {
      if (prev.includes(program)) {
        return prev.filter((p) => p !== program);
      }

      if (prev.length >= 5) {
        alert("최대 5개까지 선택 가능합니다.");
        return prev;
      }

      return [...prev, program];
    });
  };

  return (
    <div className="estimate-page">
      <Helmet>
        <title>{PAGE_TITLES.estimate}</title>
        <meta property="og:title" content={PAGE_TITLES.estimate} />
        <meta property="og:url" content={`${SITE_URL}${ROUTES.ESTIMATE}`} />
        <meta name="twitter:title" content={PAGE_TITLES.estimate}></meta>
        <meta
          name="twitter:url"
          content={`${SITE_URL}${ROUTES.ESTIMATE}`}
        ></meta>
      </Helmet>
      <div className="estimate-container">
        <section className="estimate-pc-usage">
          {Object.keys(PROGRAMS).map((category) => (
            <div key={category} className="category-container">
              <button
                className={`estimate-category ${activeCategory === category ? "selected" : ""}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
              {activeCategory === category && (
                <div className="program-list">
                  {PROGRAMS[category].map((program) => (
                    <label key={program} className="program-item">
                      <input
                        type="checkbox"
                        checked={selectedPrograms.includes(program)}
                        onChange={() => handleProgramSelect(program)}
                      />
                      {program}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {selectedPrograms.length > 0 && (
          <section className="selected-programs">
            <h3>선택된 프로그램 ({selectedPrograms.length}/5)</h3>
            <div className="selected-programs-list">
              {selectedPrograms.map((program) => (
                <div key={program} className="selected-program-item">
                  {program}
                  <button
                    className="remove-program"
                    onClick={() => handleProgramSelect(program)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="estimate-budget-section">
          <div className="estimate-pc-budget-header">
            <span className="estimate-pc-title">예산</span>
            <span className="budget-value">
              {budgetRange[0]}만원 ~ {budgetRange[1]}만원
            </span>
          </div>
          <Range
            step={10}
            min={100}
            max={2000}
            values={budgetRange}
            onChange={(values) => setBudgetRange(values)}
            renderTrack={({ props, children, isDragged }) => (
              <div
                {...props}
                className="range-track"
                style={{
                  ...props.style,
                  background: `linear-gradient(to right, 
                    #ddd 0%,
                    #ddd ${(budgetRange[0] - 100) / 19}%,
                    #007bff ${(budgetRange[0] - 100) / 19}%,
                    #007bff ${(budgetRange[1] - 100) / 19}%,
                    #ddd ${(budgetRange[1] - 100) / 19}%,
                    #ddd 100%)`,
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return <div key={key} {...restProps} className="range-thumb" />;
            }}
          />
          <div className="estimate-pc-budget-range">
            <span>2000만원</span>
          </div>
        </section>

        {selectedPrograms.length > 0 ? (
          <section className="pc-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="pc-card">
                <div className="pc-image">PC 추천 {item}</div>
                <div className="pc-actions">
                  <button className="buy-button">구매하기</button>
                  <button className="wishlist-button">+ 관심등록</button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section>
            <p>주로 사용할 프로그램을 하나 이상 선택해주세요</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default EstimatePage;
