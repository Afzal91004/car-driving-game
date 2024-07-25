import React from "react";

const Line = ({ y }) => {
  return (
    <div
      className="line absolute h-16 w-1 bg-white"
      style={{ top: y + "px", left: "50%" }}
    />
  );
};

export default Line;
