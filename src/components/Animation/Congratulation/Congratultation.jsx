import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./congratulation.json";

export const Congratulation = () => {
  const lottieContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);
  return (
    <div
      ref={lottieContainer}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
      }}
    ></div>
  );
};
