import "../styles/CartModal.css";
import { setCookie, getCookie } from "../utils/cookieUtils";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CartUtils } from "../utils/cartUtils";

const getCartFromCookies = () => {
  const cart = JSON.parse(getCookie("cart") || '{"products": []}');
  return cart;
};

function CartModal({ isOpen, onClose }) {
  const [cart, setCart] = useState(null);
  const cartUtils = new CartUtils();

  useEffect(() => {
    if (!isOpen) return;

    const gett = cartUtils.getProductsInCartByCart();
    setCart(gett);
  }, [isOpen]);

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
      <div className="modal-content bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Carrito de Compras</h2>
        
        {cart && cart.products && cart.products.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cart.products.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-gray-500">
                        {product.quantity} x {product.price} COP
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">
                    {product.price * product.quantity} COP
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-xl font-semibold text-gray-800">
                Total:{" "}
                {cart.products.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )}{" "}
                COP
              </p>
              <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all">
                Proceder al pago
              </button>
            </div>
          </>
        ) : (
          <p className="mt-4 text-gray-500 text-center">Tu carrito está vacío.</p>
        )}
      </div>
    </div>
  );
}

export default CartModal;
