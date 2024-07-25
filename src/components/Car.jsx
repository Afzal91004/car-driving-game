import React from "react";
import playerCar from "../assets/playerCar.png";

const Car = ({ x, y }) => {
  return (
    <div
      className="car absolute w-16 h-32 bg-white"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundImage: "url(car.png)",
        backgroundSize: "cover",
      }}
    >
      <img src={playerCar} alt="" />
    </div>
  );
};

export default Car;
