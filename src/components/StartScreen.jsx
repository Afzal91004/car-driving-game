import React from "react";

function StartScreen() {
  const start = () => {
    console.log(`let's play`);
  };

  return <div onClick={start}>Welcome Message</div>;
}

export default StartScreen;
StartScreen;
