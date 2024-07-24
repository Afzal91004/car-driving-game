import { useEffect, useState, useRef } from "react";

function App() {
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [player, setPlayer] = useState(false);
  const [x, setX] = useState(50); // Initial left position
  const [y, setY] = useState(100); // Initial bottom position
  const speed = 5;
  const animationFrameRef = useRef(null);

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
    };
  }, []);

  useEffect(() => {
    if (player) {
      const animate = () => {
        if (arrowUp || arrowDown || arrowRight || arrowLeft) {
          playGame();
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
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
      if (newX > gameAreaWidth - 56) return gameAreaWidth - 56; // 56 is the width of the car
      return newX;
    });

    setY((prevY) => {
      const newY = prevY + moveY;
      // Check bounds for Y
      if (newY < 0) return 0;
      if (newY > gameAreaHeight - 32) return gameAreaHeight - 32; // 32 is the height of the car
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
  const Line = () => {
    const lineWidth = 10;
    // const lineHeight = 24;
    const segmentLength = 60;
    const segmentGap = 40;
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
          <Line />
          <Car />
        </div>
      </div>
    </div>
  );
}

export default App;
