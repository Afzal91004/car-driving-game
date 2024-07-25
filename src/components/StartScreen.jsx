import React from "react";
import convertibleCar from "../assets/convertible-car.gif";
import backgroundMusic from "../assets/background-music.wav"; // Import your .wav file

const StartScreen = ({ startGame }) => {
  return (
    <div className="startScreen text-center border-2 border-gray-500 p-4 mx-auto w-64 mt-8 rounded">
      <p className="hidden md:block">Arrow keys to move</p>
      <p>If you hit another car you will lose.</p>
      <button
        className="mt-4 bg-gray-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startGame}
      >
        Start Game
      </button>
      <div>
        <img src={convertibleCar} alt="" />
      </div>
      <audio src={backgroundMusic} autoPlay loop />
    </div>
  );
};

export default StartScreen;
