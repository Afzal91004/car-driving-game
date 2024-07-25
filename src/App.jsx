import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Car from "./components/Car";
import EnemyCar from "./components/EnemyCar";
import Line from "./components/Line";
import { randomColor } from "./utils";
import kromaApps from "./assets/KROMAAPPS.png";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState({
    x: 0,
    y: 0,
    speed: 5,
    score: 0,
  });
  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });
  const [enemyCars, setEnemyCars] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const handlePlayerMovement = () => {
        if (keys.ArrowUp && player.y > 0) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            y: prevPlayer.y - player.speed,
          }));
        }
        if (keys.ArrowDown && player.y < window.innerHeight - 100) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            y: prevPlayer.y + player.speed,
          }));
        }
        if (keys.ArrowLeft && player.x > 0) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            x: prevPlayer.x - player.speed,
          }));
        }
        if (keys.ArrowRight && player.x < window.innerWidth - 50) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            x: prevPlayer.x + player.speed,
          }));
        }
      };

      const gameInterval = setInterval(() => {
        handlePlayerMovement();
        moveLines();
        moveEnemyCars();
        checkCollision();
        updateScore();
      }, 1000 / 60); // 60 FPS

      return () => clearInterval(gameInterval);
    }
  }, [gameStarted, keys, player]);

  const startGame = () => {
    setGameStarted(true);
    initializeGame();
  };

  const endGame = () => {
    setGameStarted(false);
    setPlayer((prevPlayer) => ({ ...prevPlayer, score: 0 }));
  };

  const initializeGame = () => {
    const gameAreaWidth = 96; // Set the width of the game area
    const carWidth = 50; // Set the width of the car
    const carHeight = 100; // Set the height of the car

    setPlayer({
      x: (gameAreaWidth - carWidth) / 2,
      y: window.innerHeight - carHeight - 20, // Position near the bottom
      speed: 5,
      score: 0,
    });

    const initialLines = [];
    for (let i = 0; i < 10; i++) {
      initialLines.push({ y: i * 150 });
    }
    setLines(initialLines);

    const initialEnemyCars = [];
    for (let i = 0; i < 3; i++) {
      initialEnemyCars.push({
        y: (i + 1) * -600,
        left: Math.floor(Math.random() * (gameAreaWidth - 50)),
        color: randomColor(), // Set a fixed color for each enemy car
      });
    }
    setEnemyCars(initialEnemyCars);
  };

  const moveLines = () => {
    setLines((prevLines) =>
      prevLines.map((line) => ({
        ...line,
        y: line.y > window.innerHeight ? -100 : line.y + player.speed,
      }))
    );
  };

  const moveEnemyCars = () => {
    setEnemyCars((prevEnemyCars) =>
      prevEnemyCars.map((car) => ({
        ...car,
        y: car.y > window.innerHeight ? -600 : car.y + player.speed,
        left:
          car.y > window.innerHeight
            ? Math.floor(Math.random() * (300 - 50))
            : car.left,
        color: car.color, // Keep the same color
      }))
    );
  };

  const checkCollision = () => {
    enemyCars.forEach((enemy) => {
      if (
        player.y < enemy.y + 100 &&
        player.y + 100 > enemy.y &&
        player.x < enemy.left + 50 &&
        player.x + 50 > enemy.left
      ) {
        endGame();
      }
    });
  };

  const updateScore = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      score: prevPlayer.score + 1,
    }));
  };

  return (
    <div className="App overflow-hidden">
      <div className="score bg-white h-16 w-screen text-black text-center text-2xl font-fantasy flex items-center justify-between">
        <div>Car Driving Game</div>
        <div>Score: {player.score}</div>
        <div>
          <img src={kromaApps} style={{ width: 200 }} alt="" />
        </div>
      </div>
      {!gameStarted && <StartScreen startGame={startGame} />}
      {gameStarted && (
        <div className="gameArea bg-black w-screen h-screen overflow-hidden relative fixed">
          {lines.map((line, index) => (
            <Line key={index} y={line.y} />
          ))}
          <Car x={player.x} y={player.y} />
          {enemyCars.map((enemy, index) => (
            <EnemyCar
              key={index}
              y={enemy.y}
              left={enemy.left}
              color={enemy.color}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
