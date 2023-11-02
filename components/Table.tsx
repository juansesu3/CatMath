import React from "react";

import Swal from "sweetalert2";
const Table = () => {
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

  return (
    <div className="font-myFont text-secondary flex flex-col items-center mt-20">
      <h1 className="text-4xl font-bold mb-6">TABLES</h1>
      <div className="grid grid-cols-1 ">
        <div className="grid grid-cols-2 gap-y-4 gap-x-10">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => showMultiplicationTable(num)}
              className="bg-pink-400 shadow-md  hover:bg-sky-700  hover:text-white w-16  h-16 rounded-full text-5xl flex items-center justify-center pb-2 pr-0"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
