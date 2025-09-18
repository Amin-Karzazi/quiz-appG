import React from "react";

function QuizResult({ score, highScore, onRestart }) {
  return (
    <div className="quiz-finished">
      <h2>Votre score : {score}</h2>
      <h3>Meilleur score : {highScore}</h3>
      <button onClick={onRestart}>Recommencer</button>
    </div>
  );
}

export default QuizResult;
