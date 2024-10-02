import React from 'react';

const Loading = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-green-500 mb-4 mx-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-10.293a1 1 0 00-1.414 0L10 10.586l-1.879-1.879a1 1 0 00-1.414 1.414l2.586 2.586a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-lg font-semibold">{message || "Cargando..."}</h2>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-[#f7002f] text-white rounded-lg hover:bg-[#f04968] transition-colors duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Loading;
