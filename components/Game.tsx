import { useState } from "react";

type Question = {
  multiplier: number;
  result: number;
  options: number[];
};

type Level = {
  tableNumber: number;
  questions: Question[];
};

const generateLevels = (maxTableNumber: number): Level[] => {
  const levels: Level[] = [];
  for (let i = 0; i <= maxTableNumber; i++) {
    const questions: Question[] = [];
    for (let j = 1; j <= 10; j++) {
      const result = i * j;
      // Generar opciones aleatorias para la pregunta
      const options = [result - 1, result, result + 1].sort(
        () => Math.random() - 0.5
      );
      questions.push({ multiplier: j, result, options });
    }
    levels.push({ tableNumber: i, questions });
  }
  return levels;
};

const Game = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const levels = generateLevels(12);
  const currentLevel = levels[currentLevelIndex];
  const currentQuestion = currentLevel.questions[currentQuestionIndex];

  const handleAnswer = (answer: number) => {
    if (answer === currentQuestion.result) {
      // Si la respuesta es correcta, ir a la siguiente pregunta
      if (currentQuestionIndex < currentLevel.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Si todas las preguntas están completadas, pasar al siguiente nivel
        setCurrentLevelIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      }
    } else {
      alert("¡Respuesta incorrecta! Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      {/* Mostrar la pregunta actual */}
      <h2>
        {currentLevel.tableNumber} x {currentQuestion.multiplier} = ?
      </h2>

      {/* Mostrar las opciones */}
      <div>
        {currentQuestion.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
