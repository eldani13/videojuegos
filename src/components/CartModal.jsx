import React from 'react';
import '../styles/CartModal.css';

function CartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full"
      onClick={handleOverlayClick} 
    >
      <div className="modal-content bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <button
          className="close-button text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-lg font-semibold mt-4">Carrito de Compras</h2>
        <p className="mt-2">Tu carrito está vacío.</p>
      </div>
    </div>
  );
}

export default CartModal;
