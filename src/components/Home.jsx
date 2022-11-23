import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { AdsenseMain } from "./adsense/main";

export const Home = () => {
  const [isAdsense, setIsAdsense] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAdsense(true);
    }, 100);
    return setIsAdsense(false);
  }, []);

  return (
    <div className="home-container">
      <div>
        <h1>같은 그림찾기</h1>
      </div>
      <div className="my-4">{isAdsense ? <AdsenseMain /> : ""}</div>
      <div style={{ marginTop: 20 }}>
        <Link to="/game">
          <button className="btn-start">START</button>
        </Link>
      </div>
      <article>
        <div className="post">
          <h1>같은그림찾기를 즐겨보세요</h1>
          <p>
            같은그림찾기는 언제나 가장 인기있는 퍼즐 게임입니다. 같은그림찾기의
            목표는 서로다른 여러개의 그림에서 같은 그림 2개를 빠르게 찾아내는
            두뇌운동 게임입니다. 매일 하루에 한 번씩 해보시면 집중력과 전체적인
            기억력이 향상되기 시작합니다. 지금 게임을 시작하세요. 바로
            같은그림찾기 두뇌운동이 당신이 가장 좋아하는 무료 온라인 게임이 될
            수 있습니다.
          </p>
        </div>
        <div className="post">
          <h1>같은그림찾기에 대하여</h1>
          <p>
            인기있는 같은그림찾기 게임은 Match3라고도 불립니다. 서로다른
            여러개의 그림들 중에서 모양이 같은 그림을 선택하면 됩니다. 특별한
            지식을 필요로 하지 않습니다. 두뇌와 집중력만 있으면 됩니다.
          </p>
        </div>
      </article>
    </div>
  );
};
