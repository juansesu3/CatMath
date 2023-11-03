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

// Función para generar un número aleatorio dentro de un rango
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateLevels = (maxTableNumber: number): Level[] => {
  const levels: Level[] = [];
  for (let i = 0; i <= maxTableNumber; i++) {
    const questions: Question[] = [];
    for (let j = 1; j <= 10; j++) {
      const result = i * j;
      // Generar opciones aleatorias para la pregunta, asegurando que la respuesta correcta esté incluida
      let options = [result];
      while (options.length < 3) {
        let option = getRandomNumber(result - 10, result + 10);
        if (options.indexOf(option) === -1 && option !== result) {
          options.push(option);
        }
      }
      // Mezclar las opciones para que la posición de la respuesta correcta sea aleatoria
      options = options.sort(() => Math.random() - 0.5);
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
  const buttonColors = [
    "bg-[#f78f2e]",
    "bg-[#f14c90]",
    "bg-[#fde642]",
    "bg-[#3ab14b]",
  ].sort(() => Math.random() - 0.5);
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
  const getButtonClass = (index: number) => {
    if (index === 2) {
      // Si es el tercer botón, ocupa las dos columnas
      return "col-span-2";
    }
    return "";
  };

  return (
    <div className="min-h-screen  flex flex-col gap-6 items-center justify-center font-myFont font-bold  text-secondary">
      {/* Mostrar la pregunta actual */}
      <h2 className="text-5xl  ">
        {currentLevel.tableNumber} x {currentQuestion.multiplier} = ?
      </h2>

      {/* Mostrar las opciones */}
      <div className="grid grid-cols-2 gap-3  justify-items-center align-items-center">
        {currentQuestion.options.map((option, index) => (
          <button
            className={`${
              buttonColors[index]
            } w-16 h-16 rounded-full  ${getButtonClass(index)}`}
            key={index}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
