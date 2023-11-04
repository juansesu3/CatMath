import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const data = { name, email, password, image };
    if (!name || !email || !password || !image) {
      setError(true);
      return;
    }
    try {
      await axios.post("/api/register", data);
      router.push("/");
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };
  return (
    <div className="flex justify-center items-center mt-52">
      {" "}
      <form onSubmit={handleSubmit} className="flex flex-col  gap-3">
        <input
          type="text"
          className="rounded-md p-2 shadow-sm focus:shadow-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="user name"
        />
        <input
          className="rounded-md p-2 shadow-sm focus:shadow-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          type="text"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="email"
        />
        <input
          className="rounded-md p-2 shadow-sm focus:shadow-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          type="text"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="password"
        />
        <button
          type="submit"
          href={"https://e-commerce-admin-kappa.vercel.app/"}
          className="bg-[#3ab14b] p-2 px-4 rounded-md text-white hover:bg-[#f14c90] font-medium shadow-md transition duration-300 ease-in-out"
        >
          Register
        </button>
        {error && (
          <div className="bg-red-500 text-white rounded-md px-2 text-center">
            All fields are necessary
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
