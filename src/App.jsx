import { useEffect, useState, useRef } from "react";

function App() {
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [player, setPlayer] = useState(false);
  const [x, setX] = useState(50); // Initial left position
  const [y, setY] = useState(100); // Initial bottom position
  const [showLine1, setShowLine1] = useState(true);
  const [enemyX, setEnemyX] = useState(Math.random() * 500); // Initial enemy left position
  const [enemyY, setEnemyY] = useState(-50); // Initial enemy bottom position (above the game area)
  const speed = 5;
  const enemySpeed = 2;
  const animationFrameRef = useRef(null);
  const toggleIntervalRef = useRef(null);
  const enemyAnimationFrameRef = useRef(null);

  // Define game area boundaries
  const gameAreaWidth = 500;
  const gameAreaHeight = 680;

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
          setArrowUp(true);
          break;
        case "ArrowDown":
          setArrowDown(true);
          break;
        case "ArrowRight":
          setArrowRight(true);
          break;
        case "ArrowLeft":
          setArrowLeft(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
          setArrowUp(false);
          break;
        case "ArrowDown":
          setArrowDown(false);
          break;
        case "ArrowRight":
          setArrowRight(false);
          break;
        case "ArrowLeft":
          setArrowLeft(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (toggleIntervalRef.current) {
        clearInterval(toggleIntervalRef.current);
      }
      if (enemyAnimationFrameRef.current) {
        cancelAnimationFrame(enemyAnimationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (player) {
      const animatePlayer = () => {
        if (arrowUp || arrowDown || arrowRight || arrowLeft) {
          playGame();
        }
        animationFrameRef.current = requestAnimationFrame(animatePlayer);
      };

      const animateEnemy = () => {
        moveEnemy();
        enemyAnimationFrameRef.current = requestAnimationFrame(animateEnemy);
      };

      animationFrameRef.current = requestAnimationFrame(animatePlayer);
      enemyAnimationFrameRef.current = requestAnimationFrame(animateEnemy);

      toggleIntervalRef.current = setInterval(() => {
        setShowLine1((prev) => !prev);
      }, 300);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (toggleIntervalRef.current) {
          clearInterval(toggleIntervalRef.current);
        }
        if (enemyAnimationFrameRef.current) {
          cancelAnimationFrame(enemyAnimationFrameRef.current);
        }
      };
    }
  }, [arrowUp, arrowDown, arrowRight, arrowLeft, player]);

  function playGame() {
    let moveX = 0;
    let moveY = 0;

    if (arrowUp) {
      moveY += speed;
    }
    if (arrowDown) {
      moveY -= speed;
    }
    if (arrowRight) {
      moveX += speed;
    }
    if (arrowLeft) {
      moveX -= speed;
    }

    setX((prevX) => {
      const newX = prevX + moveX;
      // Check bounds for X
      if (newX < 0) return 0;
      if (newX > gameAreaWidth - 56) return gameAreaWidth - 56;
      return newX;
    });

    setY((prevY) => {
      const newY = prevY + moveY;
      // Check bounds for Y
      if (newY < 0) return 0;
      if (newY > gameAreaHeight - 32) return gameAreaHeight - 32;
      return newY;
    });
  }

  function moveEnemy() {
    setEnemyY((prevY) => {
      const newY = prevY + enemySpeed;
      if (newY > gameAreaHeight) {
        // Respawn enemy at the top at a random horizontal position
        setEnemyX(Math.random() * (gameAreaWidth - 56));
        return -50; // Restart enemy position above the game area
      }
      return newY;
    });
  }

  const start = () => {
    setPlayer(true);
  };

  const Car = () => (
    <div>
      {player && (
        <div
          className="absolute w-14 h-32 bg-blue-950 m-auto "
          style={{ left: `${x}px`, bottom: `${y}px` }}
        >
          car
        </div>
      )}
    </div>
  );

  const EnemyCar = () => (
    <div>
      {player && (
        <div
          className="absolute w-14 h-32 bg-red-500 m-auto "
          style={{ left: `${enemyX}px`, top: `${enemyY}px` }}
        >
          enemy
        </div>
      )}
    </div>
  );

  const Line1 = () => {
    const lineWidth = 10;
    const segmentLength = 50;
    const segmentGap = 50;
    const totalSegments = Math.ceil(
      gameAreaHeight / (segmentLength + segmentGap)
    );

    return (
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(totalSegments)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-white"
            style={{
              width: `${lineWidth}px`,
              height: `${segmentLength}px`,
              top: `${index * (segmentLength + segmentGap)}px`,
              left: `${gameAreaWidth / 2 - lineWidth / 2}px`,
            }}
          />
        ))}
      </div>
    );
  };

  const Line2 = () => {
    const lineWidth = 10;
    const segmentLength = 50;
    const segmentGap = 50;
    const totalSegments = Math.ceil(
      gameAreaHeight / (segmentLength + segmentGap)
    );

    return (
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(totalSegments)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-white"
            style={{
              width: `${lineWidth}px`,
              height: `${segmentLength}px`,
              top: `${index * (segmentLength + segmentGap) + 50}px`,
              left: `${gameAreaWidth / 2 - lineWidth / 2}px`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>score</div>
      <div className="">
        gameclass
        <div
          onClick={start}
          className={`cursor-pointer transition-opacity duration-500 ${
            player ? "hidden" : ""
          }`}
        >
          Welcome Message (StartScreenClass)
        </div>
        <div
          className={`transition-opacity duration-500 h-svh w-48 m-auto bg-black relative overflow-hidden ${
            player ? "" : "hidden"
          }`}
          id="gameArea"
          style={{ width: `${gameAreaWidth}px`, height: `${gameAreaHeight}px` }} // Set game area size
        >
          {showLine1 ? <Line1 /> : <Line2 />}
          <Car />
          <EnemyCar />
        </div>
      </div>
    </div>
  );
}

export default App;
