import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
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
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Estado para el tiempo restante
  const [levels, setLevels] = useState<Level[]>(generateLevels(12)); // Genera los niveles una vez y los almacena en el estado
  const [score, setScore] = useState(0); // Estado para rastrear la puntuación del jugador
  const [userId, setUserId] = useState(null);
  const currentLevel = levels[currentLevelIndex];
  const currentQuestion = currentLevel.questions[currentQuestionIndex];

  const { data: session } = useSession();
  const userName = session?.user?.name;

  console.log(userName);
  useEffect(() => {
    // Asumiendo que la petición '/api/user' te trae una lista de usuarios,
    // y no se quiere filtrar en la petición, sino después de obtener la respuesta.
    axios
      .get("/api/user")
      .then((response) => {
        // Encuentra el usuario que coincide con el 'userName' de la sesión.
        const user = response.data.find(
          (u: { name: string | null | undefined }) => u.name === userName
        );
        if (user) {
          // Aquí tienes el '_id' del usuario que coincide con el nombre de usuario de la sesión
          setUserId(user._id);
          console.log(user._id); // Hacer algo con el _id
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching user data",
          error.response?.data || error.message
        );
      });
  }, [userName]); // Se ejecuta sólo cuando 'userName' cambia

  useEffect(() => {
    // La llamada a la API para obtener la información del usuario por su ID
    if (userId) {
      // Se asegura de que userId no es nulo
      axios
        .get(`/api/user?id=${encodeURIComponent(userId)}`) // Usa el userId para hacer la llamada
        .then((response) => {
          // Puedes hacer algo con la información del usuario aquí
          console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Error fetching user details",
            error.response?.data || error.message
          );
        });
    }
  }, [userId]); // Depende de userId para re-ejecutarse

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
    // Restablecer el temporizador para la siguiente pregunta
    setTimeLeft(10);

    if (currentQuestionIndex < currentLevel.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (score >= 11) {
      // Verificar si la puntuación es suficiente para avanzar
      // Resetear la puntuación para el siguiente nivel y avanzar si las condiciones son correctas
      setScore(0); // Restablece la puntuación al pasar al siguiente nivel si deseas que la puntuación sea por nivel
      setCurrentLevelIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Si no alcanza la puntuación necesaria, mostrar una alerta o manejar según la lógica deseada
      alert("No tienes suficientes puntos para pasar al siguiente nivel.");
    }
  };
  const updatePoints = async (newPoints: number) => {
   
    const data = {
      points: newPoints,
    };
    try {
      const response = await axios.put(`/api/user`, { ...data, _id: userId });

      console.log("Points updated: ", response.data);
    } catch (error) {
      console.error(
        "Error updating points: ",
        error.response?.data || error.message
      );
    }
  };

  const handleAnswer = (answer: number) => {
    if (answer === currentQuestion.result) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        // Actualizar los puntos usando la nueva puntuación como referencia
        updatePoints(newScore); // Enviar el incremento de puntos
        return newScore;
      });
      nextQuestion();
    } else {
      alert("¡Respuesta incorrecta! Inténtalo de nuevo.");
      // Mantener la puntuación y dar la opción de reintentar la misma pregunta
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
      {/* Mostrar la puntuación actual del jugador */}
      <h2 className="text-2xl">Puntuación: {score}/12</h2>
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
