import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Question from "./components/Question";
import QuizResult from "./components/QuizResult";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);

  // Nouveaux états pour personnalisation
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  // Charger les questions une fois que le joueur lance la partie
  useEffect(() => {
    if (!gameStarted) return;

    let apiUrl = `https://opentdb.com/api.php?amount=5&type=multiple`;
    if (category) apiUrl += `&category=${category}`;
    if (difficulty) apiUrl += `&difficulty=${difficulty}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(randomIndex, 0, q.correct_answer);

          return {
            question: q.question,
            options: options,
            answer: q.correct_answer,
          };
        });
        setQuestions(formattedQuestions);
      });
  }, [gameStarted, category, difficulty]);

  // Timer
  useEffect(() => {
    if (timer === 0 || isQuizFinished) return;
    const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
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
      setCurrentQuestionIndex((prev) => prev + 1);
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
    setGameStarted(false);
  };

  // --- ÉCRAN D’ACCUEIL ---
  if (!gameStarted) {
    return (
      <div className="App">
        <h1>Quiz Interactif 🎯</h1>
        <div className="menu">
          <label>
            Catégorie :
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Aléatoire</option>
              <option value="9">Culture Générale</option>
              <option value="21">Sport</option>
              <option value="23">Histoire</option>
              <option value="17">Science & Nature</option>
              <option value="18">Informatique</option>
            </select>
          </label>
          <br />
          <label>
            Difficulté :
            <select onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">Aléatoire</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </label>
          <br />
          <button onClick={() => setGameStarted(true)}>Commencer le Quiz 🚀</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <h2>Chargement des questions...</h2>;
  }

  // --- ÉCRAN DU QUIZ ---
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="App">
      <h1>Quiz Interactif 🎯</h1>
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
          {selectedOption !== null && (
            <button onClick={handleNextQuestion}>Suivant</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
