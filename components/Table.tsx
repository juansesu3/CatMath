import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";
const Table = () => {
  const [userId, setUserId] = useState(null);
  const [userState, setUserState] = useState([]);
  const router = useRouter();
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const showMultiplicationTable = (tableNumber: number) => {
    const htmlContent = `
      <div>
          <h2 class="text-3xl font-bold mb-4">
              Table of ${tableNumber}
          </h2>
          <ul>
              ${numbers
                .map(
                  (num) => `
                  <li class="mb-2">${tableNumber} x ${num} = ${
                    tableNumber * num
                  }</li>
              `
                )
                .join("")}
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
          getUser(user._id);
          console.log(user._id); // Hacer algo con el _id
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching user data",
          error.response?.data || error.message
        );
      });
  }, []); // Se ejecuta sólo cuando 'userName' cambia

  const getUser = async (userId: string | number | boolean) => {
    if (userId) {
      // Se asegura de que userId no es nulo
      await axios
        .get(`/api/user?id=${encodeURIComponent(userId)}`) // Usa el userId para hacer la llamada
        .then((response) => {
          // Puedes hacer algo con la información del usuario aquí
          setUserState(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(
            "Error fetching user details",
            error.response?.data || error.message
          );
        });
    }
  };
  console.log(userState);

  return (
    <div className="font-myFont text-secondary flex flex-col items-center mt-2">
      <h1 className="text-4xl font-bold ">TABLES </h1>

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
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => showMultiplicationTable(num)}
              className={`bg-pink-400 shadow-md relative hover:bg-sky-700 hover:text-white w-16 h-16 rounded-full text-5xl flex items-center justify-center pb-2 pr-0 transition duration-300 ease-in-out ${
                num > userState.currentLevel ? "bg-lock" : "" // Clase condicional para el fondo si está bloqueado
              }`}
            >
              {num}
              {num > userState.currentLevel && ( // Sólo muestra el icono de candado si la tabla es mayor que el nivel actual
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
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
