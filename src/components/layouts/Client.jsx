import React from "react";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa"; 

function Client() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 py-10 px-5">
      <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 max-w-xs transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <FaWhatsapp className="text-5xl text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Atención personalizada al instante</h3>
        <p className="text-gray-600">
          Recibe atención personalizada al instante. Estamos comprometidos en
          brindarte la mejor experiencia de atención al cliente.
        </p>
      </div>

      <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 max-w-xs transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <FaCheckCircle className="text-5xl text-[#f7002f] mb-4" />
        <h3 className="text-xl font-bold mb-2">Garantía asegurada</h3>
        <p className="text-gray-600">
          Nuestro compromiso es tu satisfacción, por eso ofrecemos una
          garantía asegurada en todos nuestros juegos.
        </p>
      </div>
    </div>
  );
}

export default Client;
