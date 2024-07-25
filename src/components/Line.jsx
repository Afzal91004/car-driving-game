import React from "react";

const Line = ({ y }) => {
  return (
    <div>
      <div
        className="line absolute h-16 w-1 bg-white"
        style={{ top: y + "px", left: "50%" }}
      />
      <div
        className="line absolute h-full w-1 bg-white"
        style={{ top: y + "px", left: "5%" }}
      />
      <div
        className="line absolute h-full w-1 bg-white"
        style={{ top: y + "px", left: "95%" }}
      />
    </div>
  );
};

export default Line;
