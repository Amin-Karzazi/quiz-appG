import React from "react";

function Timer({ timeLeft }) {
  return (
    <div className="timer">
      <p>Temps restant: {timeLeft} secondes</p>
    </div>
  );
}

export default Timer;
