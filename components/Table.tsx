import { useRouter } from "next/router";
import React from "react";

import Swal from "sweetalert2";
const Table = () => {
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
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => showMultiplicationTable(num)}
              className="bg-pink-400 shadow-md relative  hover:bg-sky-700  hover:text-white w-16  h-16 rounded-full text-5xl flex items-center justify-center pb-2 pr-0 transition duration-300 ease-in-out"
            >
              {num}
              <span className="flex items-end justify-center bg-gray-400  rounded-full p-1 absolute bottom-0 right-[-10px]">
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
