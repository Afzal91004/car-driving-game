import React from "react";
import enemyCar from "../assets/enemyCar.png";

const EnemyCar = ({ y, left, color }) => {
  return (
    <div
      className="enemy absolute w-16 h-32"
      style={{
        top: `${y}px`,
        left: `${left}px`,
        backgroundColor: color,
      }}
    >
      <img src={enemyCar} alt="" />
    </div>
  );
};

export default EnemyCar;
