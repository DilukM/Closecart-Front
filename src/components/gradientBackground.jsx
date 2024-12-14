import React, { useEffect, useState } from "react";

const GradientBackground = () => {
  const [gradientPatches, setGradientPatches] = useState([]);
  const [transitionActive, setTransitionActive] = useState(false);

  // More saturated pastel colors with emphasis on single-color gradients
  const saturatedPastelColors = [
    "#FFD700", // Saturated Gold
    "#FF6B6B", // Saturated Coral Red
    "#4ECDC4", // Saturated Teal
    "#A8DADC", // Saturated Light Blue
    "#FCA311", // Saturated Orange
    "#9B5DE5", // Saturated Purple
    "#00BBF9", // Saturated Sky Blue
    "#00F5D4", // Saturated Turquoise
    "#FB5607", // Saturated Vibrant Orange
    "#8AC926", // Saturated Lime Green
  ];

  // Function to generate single-color gradient patches
  const generateGradientPatches = () => {
    // Trigger transition effect
    setTransitionActive(true);

    // After fade-out, generate new patches
    setTimeout(() => {
      const numberOfPatches = 3;
      const patches = [];

      for (let i = 0; i < numberOfPatches; i++) {
        const baseColor =
          saturatedPastelColors[
            Math.floor(Math.random() * saturatedPastelColors.length)
          ];

        patches.push({
          id: i,
          positionX: Math.random() * 100,
          positionY: Math.random() * 100,
          targetX: Math.random() * 100,
          targetY: Math.random() * 100,
          baseColor: baseColor,
          animationDelay: Math.random() * 5,
          movementDuration: 10 + Math.random() * 5,
        });
      }

      setGradientPatches(patches);

      // Reset transition state after new patches are set
      setTimeout(() => {
        setTransitionActive(false);
      }, 1500);
    }, 1500);
  };

  // Regenerate patches periodically
  useEffect(() => {
    generateGradientPatches();
    const intervalId = setInterval(generateGradientPatches, 15000);

    return () => clearInterval(intervalId);
  }, []);

  // Helper function to generate single-color radial gradient
  const generateSingleColorGradient = (color) => {
    return `radial-gradient(
      circle, 
      ${color}50 0%, 
   
      ${color}00 100%
    )`;
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      {gradientPatches.map((patch) => (
        <div
          key={patch.id}
          className="absolute"
          style={{
            top: `${patch.positionY}%`,
            left: `${patch.positionX}%`,
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: generateSingleColorGradient(patch.baseColor),
            filter: "blur(20px)",
            opacity: transitionActive ? 0 : 0.5,
            transition: "opacity 1.5s ease-in-out, transform 10s ease-in-out",
            transform: `translate(${patch.targetX - patch.positionX}%, ${
              patch.targetY - patch.positionY
            }%)`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default GradientBackground;
