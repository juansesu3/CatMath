import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Question = {
  multiplier: number;
  result: number;
  options: number[];
};

type Level = {
  tableNumber: number;
  questions: Question[];
};

type Answer = {
  tableNumber: number;
  multiplier: number;
  responseTime: number;

};

type User = {
  currentLevel: number;
  email: string;
  image: string;
  name: string;
  points: string;
  _id: string;
  updatedAt: Date;
  emailVerified: boolean;


}
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
  const router = useRouter();
  const [correctAnswers, setCorrectAnswers] = useState<Answer[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Estado para el tiempo restante
  const [levels, setLevels] = useState<Level[]>(generateLevels(12)); // Genera los niveles una vez y los almacena en el estado
  const [score, setScore] = useState(0);
  const currentLevel = levels[currentLevelIndex];
  const currentQuestion = currentLevel.questions[currentQuestionIndex];
  const [userLogged, setUserLogged] = useState<User>();
  const buttonColors = [
    "bg-[#f78f2e]",
    "bg-[#f14c90]",
    "bg-[#fde642]",
    "bg-[#3ab14b]",
  ].sort(() => Math.random() - 0.5);

  const goBack = () => {
    router.push("/tableStart");
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/game"); // Reemplaza "/api/user" con la ruta correcta de tu API
      const user = response.data; // Supongo que la información del usuario está en la propiedad "data"
      setUserLogged(user);
      console.log("Usuario obtenido:", user);
      setCurrentLevelIndex(user.currentLevel); // Establecer el nivel actual
      setScore(parseInt(user.points));
    } catch (error) {
      console.error("Error al obtesner el usuario:", error);
    }
  };
  useEffect(() => {
    // Llama a la función para obtener al usuario cuando el componente se monta
    fetchUser();
  }, []);
  useEffect(() => {
    if (userLogged) {
      // Calcular el índice del nivel actual basado en el puntaje
      const currentLevelIndex = Math.floor(score / 12); // Dividir el puntaje por el tamaño de cada nivel
      setCurrentLevelIndex(currentLevelIndex);
  
      // Calcular el índice de la pregunta actual dentro del nivel actual
      const currentQuestionIndex = score % 12 === 0 ? 11 : (score % 12) - 1;
      setCurrentQuestionIndex(currentQuestionIndex);
    }
  }, [score]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // Limpieza al desmontar o actualizar el componente
    } else {
      // Manejar el tiempo agotado
      nextQuestion();
    }
  }, [timeLeft]);

  // Nueva función para acumular las preguntas no respondidas
  const accumulateUnansweredQuestions = () => {
    const unansweredQuestions: Question[] = [];
    for (let i = currentQuestionIndex + 1; i < currentLevel.questions.length; i++) {
      unansweredQuestions.push(currentLevel.questions[i]);
    }
    return unansweredQuestions;
  };


  const nextQuestion = () => {
    if (currentQuestionIndex < currentLevel.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Verificar si hay preguntas no respondidas y agregarlas al final del nivel
      const unansweredQuestions = accumulateUnansweredQuestions();
      console.log(unansweredQuestions)
      if (unansweredQuestions.length > 0) {
        const updatedQuestions = [...currentLevel.questions, ...unansweredQuestions];
        setLevels((prevLevels) => {
          const updatedLevels = prevLevels.map((level) => {
            if (level.tableNumber === currentLevel.tableNumber) {
              return { ...level, questions: updatedQuestions };
            }
            return level;
          });
          return updatedLevels;
        });
      }
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

      setScore((prevScore) => {
        const updatedScore = prevScore + 1;
        console.log("Puntuación acumulada:", updatedScore);
        // Llama a la función para actualizar la información del usuario
        if (userLogged?._id) {
          // Verifica que userLoggedId sea válido antes de llamar a updateUserData
          updateUserData(userLogged._id, updatedScore, currentLevelIndex);
        }

        return updatedScore;
      });

    }

    if (isCorrect) {
      nextQuestion();
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Respuesta incorrecta!",
        text: "Inténtalo de nuevo.",
        confirmButtonText: "OK",
      }).then((result) => {
        // Opcional: restablecer el temporizador si se desea dar tiempo extra después de una respuesta incorrecta
        setTimeLeft(10);
      });
    }
  };
  const getButtonClass = (index: number) => {
    if (index === 2) {
      // Si es el tercer botón, ocupa las dos columnas
      return "col-span-2";
    }
    return "";
  };



  const updateUserData = async (userLoggedId: string, score: number, currentLevelIndex: number) => {
    try {
      // Llamar a tu API para actualizar la información del usuario
      const response = await axios.put(`/api/game?id=${userLoggedId}`, {
        points: score, // Actualizar puntos
        currentLevel: currentLevelIndex, // Actualizar nivel actual
      });
      console.log('>>>>>>>>',currentLevelIndex)
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
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
            className={`${buttonColors[index]
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
      <button className="bg-orange-500  mb-2 cursor-pointer hover:bg-gray-400 px-4 py-1  m-auto text-white font-myFont flex items-center justify-center rounded-md mt-6 shadow-md transition duration-300 ease-in-out" onClick={goBack}>exit</button>
    </div>
  );
};

export default Game;
