import React from 'react';
import '../styles/CartModal.css';
import { setCookie, getCookie } from '../utils/cookieUtils';

const getCartFromCookies = () => {
  const cart = JSON.parse(getCookie("cart") || '{"products": []}');
  return cart;
};

function CartModal({ isOpen, onClose }) {

  const cart = getCartFromCookies(); 
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
        
        {cart.products && cart.products.length > 0 ? (
          <div>
            <ul className="mt-2">
              {cart.products.map((product) => (
                <li key={product._id} className="flex justify-between">
                  <span>{product.name}</span>
                  <span>{product.price} COP</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Total: {cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0)} COP</p>
          </div>
        ) : (
          <p className="mt-2">Tu carrito está vacío.</p>
        )}
      </div>
    </div>
  );
}

export default CartModal;
