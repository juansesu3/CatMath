import { useEffect, useState } from "react";

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
    for (let j = 1; j <= 12; j++) {
      const result = i * j;
      let options = [result];
      while (options.length < 3) {
        // Asegurarse de que el número mínimo sea al menos 1 para evitar números negativos y cero
        let option = getRandomNumber(Math.max(1, result - 10), result + 10);
        if (options.indexOf(option) === -1 && option !== result) {
          options.push(option);
        }
      }
      options = options.sort(() => Math.random() - 0.5);
      questions.push({ multiplier: j, result, options });
    }
    levels.push({ tableNumber: i, questions });
  }
  return levels;
};

const Game = () => {
  const [correctAnswers, setCorrectAnswers] = useState<Answer[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Estado para el tiempo restante
  const [levels, setLevels] = useState<Level[]>(generateLevels(12)); // Genera los niveles una vez y los almacena en el estado

  const currentLevel = levels[currentLevelIndex];
  const currentQuestion = currentLevel.questions[currentQuestionIndex];

  // Efecto para iniciar el temporizador
  const buttonColors = [
    "bg-[#f78f2e]",
    "bg-[#f14c90]",
    "bg-[#fde642]",
    "bg-[#3ab14b]",
  ].sort(() => Math.random() - 0.5);

 
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // Limpieza al desmontar o actualizar el componente
    } else {
      // Manejar el tiempo agotado
      nextQuestion();
    }
  }, [timeLeft]);

  
  const nextQuestion = () => {
    if (currentQuestionIndex < currentLevel.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
    setTimeLeft(10); // Restablecer el tiempo para la siguiente pregunta
  };

  const handleAnswer = (answer: number) => {
    const isCorrect = answer === currentQuestion.result;
    const responseTime = 10 - timeLeft; // Calcular el tiempo de respuesta (10 segundos menos el tiempo restante)

    if (isCorrect) {
      setCorrectAnswers((prev) => [
        ...prev,
        {
          tableNumber: currentLevel.tableNumber,
          multiplier: currentQuestion.multiplier,
          responseTime,
        },
      ]);

      // Opcional: Puedes hacer algo más con la información, como enviarla a una API
      console.log("Respuesta correcta:", currentQuestion.result);
      console.log("Tiempo de respuesta:", responseTime);
      console.log(
        correctAnswers
      )
    }

    if (isCorrect) {
      nextQuestion();
    } else {
      alert("¡Respuesta incorrecta! Inténtalo de nuevo.");
      // Opcional: restablecer el temporizador si se desea dar tiempo extra después de una respuesta incorrecta
      setTimeLeft(10);
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
      <div className="grid grid-cols-2 gap-3  justify-items-center align-items-center ">
        {currentQuestion.options.map((option, index) => (
          <button
            className={`${
              buttonColors[index]
            } w-20 h-20 rounded-full text-5xl flex items-center justify-center ${getButtonClass(
              index
            )}`}
            key={index}
            onClick={() => handleAnswer(option)}
          >
            <span className=" mb-3">{option}</span>
          </button>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-4">
        <div
          className="bg-green-500 h-4"
          style={{ width: `${(timeLeft / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Game;
