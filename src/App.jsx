import { useEffect, useState } from "react";

function App() {
  const [key, setKey] = useState("");
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);

  useEffect(() => {
    // Event listener for which key pressed
    window.addEventListener("keydown", pressOn);
    window.addEventListener("keyup", pressOff);

    // Cleanup event listeners on component  which are unmounted
    return () => {
      window.removeEventListener("keydown", pressOn);
      window.removeEventListener("keyup", pressOff);
    };
  }, []);

  const pressOn = (event) => {
    event.preventDefault();
    console.log("on", event.key);
    setKey(key);
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
    }
  };

  const pressOff = (event) => {
    event.preventDefault();
    console.log("off", event.key);
    setKey("");
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
    }
  };

  const start = () => {
    console.log(`let's play`);
  };

  return (
    <div>
      <div className="">score</div>
      <div className="">
        game
        <div onClick={start}>Welcome Message(StartScreen)</div>
        <div className="hidden">gameArea</div>
        <div>
          <p>Arrow Up: {arrowUp ? "Pressed" : "Not Pressed"}</p>
          <p>Arrow Down: {arrowDown ? "Pressed" : "Not Pressed"}</p>
          <p>Arrow Right: {arrowRight ? "Pressed" : "Not Pressed"}</p>
          <p>Arrow Left: {arrowLeft ? "Pressed" : "Not Pressed"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
