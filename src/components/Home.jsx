import React from "react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="home-container">
      <div>
        <h1>같은 그림찾기</h1>
      </div>
      <Link to="/game">Start</Link>
    </div>
  );
};
