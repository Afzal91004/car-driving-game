// src/components/StartScreen.js

import React from "react";

const StartScreen = ({ startGame }) => {
  return (
    <div className="startScreen text-center border-2 border-red-600 p-4 mx-auto w-64 mt-8">
      <p>Press here to Start</p>
      <p>Arrow keys to move</p>
      <p>If you hit another car you will lose.</p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
