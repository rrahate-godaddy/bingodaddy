import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import bgwin from '../imgs/win-bg.gif'
import BingoCalled from "../components/molecules/bingoCalled";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
//   backgroundImage: `url(${bgwin})`,
//   backgroundSize: 'cover',
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 20,
    spread: 360,
    ticks: 90,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.1
    }
  };
}

export default function Fireworks() {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);


  useEffect(() => {
    setIntervalId(setInterval(nextTickAnimation, 400));
  },[])


//   const pauseAnimation = useCallback(() => {
//     clearInterval(intervalId);
//     setIntervalId(null);
//   }, [intervalId]);

//   const stopAnimation = useCallback(() => {
//     clearInterval(intervalId);
//     setIntervalId(null);
//     refAnimationInstance.current && refAnimationInstance.current.reset();
//   }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="confetti">
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
}
