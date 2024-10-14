import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/layouts/Header";

import bg from "../img/bg.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("https://backend-videojuegos.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (res.ok && data.token) {
      console.log('Token recibido:', data.token);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setErrorMessage(data.message || "Error de inicio de sesión");
      console.error("Error de inicio de sesión:", data.message);
    }
  };

  return (
    <>
    <Header />
    <div
      className="flex items-center justify-center h-screen bg-gradient-to-r"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-[#f7002f] p-10 rounded-lg shadow-lg w-full max-w-sm mx-4"
        style={{
          boxShadow: "1px 1px 30px #f7002f",
        }}
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Iniciar Sesión
        </h2>
        {errorMessage && (
          <p className="text-white text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-white font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white font-medium mb-1"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-white text-black p-3 rounded-lg flex justify-center items-center hover:bg-[#e99aa9] hover:text-white transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
    </>
   
  );
}

export default Login;
