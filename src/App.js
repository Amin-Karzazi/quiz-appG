import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Question from "./components/Question";
import QuizResult from "./components/QuizResult";

const questions = [
  {
    question: "Quel est le plus grand océan du monde ?",
    options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
    answer: "Pacifique",
  },
  {
    question: "Qui a écrit 'Les Misérables' ?",
    options: ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Marcel Proust"],
    answer: "Victor Hugo",
  },
  {
    question: "Quel est l'animal le plus rapide du monde ?",
    options: ["Guépard", "Aigle royal", "Cheval", "Dauphin"],
    answer: "Guépard",
  },
  {
    question: "Quelle est la capitale de l'Australie ?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
  },
  {
    question: "Quel est le plus grand désert du monde ?",
    options: ["Sahara", "Karakum", "Gobi", "Antarctique"],
    answer: "Antarctique",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);

  useEffect(() => {
    if (timer === 0 || isQuizFinished) return;

    const timerId = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer, isQuizFinished]);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizFinished(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
      }
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setTimer(30);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(30);
    setIsQuizFinished(false);
    setSelectedOption(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <h1>Quiz Interactif</h1>
      {isQuizFinished ? (
        <QuizResult score={score} highScore={highScore} onRestart={handleRestart} />
      ) : (
        <div className="quiz-container">
          <Question
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
          <Timer timeLeft={timer} />
          {selectedOption !== null && <button onClick={handleNextQuestion}>Suivant</button>}
        </div>
      )}
    </div>
  );
}

export default App;
