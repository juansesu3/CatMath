import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
const Table = () => {
  const router = useRouter();
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const [userLogged, setUserLogged] = useState()
  const [score, setScore] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

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


  const showMultiplicationTable = (tableNumber: number) => {
    // Función para aplicar un efecto de desenfoque
    const blurEffect = (text: string, isBlurred: boolean) => {
      return isBlurred ? `<span class="blur">${text}</span>` : text;
    };
  
    // HTML de las respuestas
    const responsesHTML = numbers.map(
      (num) =>
        `<li class="mb-2">${tableNumber} x ${num} = ${
          tableNumber * num
        }</li>`
    );
  
    // Verificar si el nivel está desbloqueado o bloqueado
    const isUnlocked = currentLevelIndex >= tableNumber;
  
    // Mensaje sobre el efecto de desenfoque
    const unlockMessage = !isUnlocked
    ? `<div class="absolute inset-0 flex items-center justify-center">
        <div class="  w-60 h-32 bg-pink-500  rounded-lg flex items-center justify-center shadow-md opacity-1">
          <p class="text-white font-semibold text-lg text-center z-10">This level is locked! <br /> Play to unlock levels!</p>
        </div>
      </div>`
    : "";
  
    // Aplicar un efecto de desenfoque si el nivel está bloqueado
    const htmlContent = `
      <div>
          <h2 class="text-3xl font-bold mb-4">
              Table of ${tableNumber}
          </h2>
          ${unlockMessage} <!-- Mensaje sobre el efecto de desenfoque -->
          <ul>
              ${responsesHTML.map((response) =>
                blurEffect(response, !isUnlocked)
              ).join("")}
          </ul>
      </div>
    `;
  
    Swal.fire({
      title: "Multiplication Table",
      html: htmlContent,
      confirmButtonText: "Go!",
      customClass: {
        popup: "popup-class",
      },
    });
  };
  const goBack = () => {
    router.push("/");
  };
  const goToGame = () => {
    router.push("/game");
  };

  return (
    <div className="font-myFont text-secondary flex flex-col items-center mt-2">
      <h1 className="text-4xl font-bold ">TABLES</h1>
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={goBack}
          className=" px-4 py-2 rounded-lg shadow-md bg-[#fde642]"
        >
          back
        </button>
        <button
          onClick={goToGame}
          className=" px-4 py-2 rounded-lg shadow-md bg-[#3ab14b]"
        >
          start
        </button>
      </div>
      <div className="grid grid-cols-1 ">
        <div className="grid grid-cols-2 gap-y-4 gap-x-10">
          {numbers.map((num, index) => (
            <button
              key={num}
              onClick={() => showMultiplicationTable(num)}
              className="bg-pink-400 shadow-md relative  hover:bg-sky-700  hover:text-white w-16  h-16 rounded-full text-5xl flex items-center justify-center pb-2 pr-0 transition duration-300 ease-in-out"
            >
              {num}
              {index < currentLevelIndex ? (
                <span className="flex items-end justify-center bg-green-500 rounded-full p-1 absolute bottom-0 right-[-10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
              ) : (
                index >= currentLevelIndex && (
                  <span className="flex items-end justify-center bg-gray-400 rounded-full p-1 absolute bottom-0 right-[-10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
