import "../styles/CartModal.css";
import { setCookie, getCookie } from "../utils/cookieUtils";
import React, { useEffect, useState } from "react";
import AOS from "aos";
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

    AOS.init();

    try {
      const gett = cartUtils.getProductsInCartByCart();
      setCart(gett);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  }, [isOpen]);

  const clearCart = () => {
    setCart({ products: [] });
    setCookie("shopping_cart", JSON.stringify({ products: [] }));
  };

  const removeProduct = (productId) => {
    const updatedProducts = cart.products.filter(
      (product) => product._id !== productId
    );
    setCart({ products: updatedProducts });
    setCookie("shopping_cart", JSON.stringify({ products: updatedProducts }));
  };

  const handleProceedToPayment = () => {
    if (!cart || cart.products.length === 0) return;

    const cartEmoji = "🛒";
    const quantityEmoji = "🔢";
    const moneyEmoji = "💰";
    const totalEmoji = "💳";
    const thankYouEmoji = "🎉";

    const message = cart.products
      .map(
        (product) =>
          `${cartEmoji} *${product.name}*\n${quantityEmoji} **Cantidad**: ${
            product.quantity
          }\n${moneyEmoji} **Precio Unitario**: ${product.price.toLocaleString(
            "es-CO"
          )} COP\n${moneyEmoji} **Subtotal**: ${(
            product.price * product.quantity
          ).toLocaleString(
            "es-CO"
          )} COP\n📦 **Descripción**: Un producto de alta calidad que garantiza satisfacción.\n`
      )
      .join("");

    const total = cart.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    const finalMessage = `Hola, estoy interesado en los siguientes productos:\n\n${message}\n${totalEmoji} **Total a Pagar**: ${total.toLocaleString(
      "es-CO"
    )} COP\n\n${thankYouEmoji} ¡Gracias por tu atención! Espero tu respuesta.`;

    const encodedMessage = encodeURIComponent(finalMessage);
    const phone = "573112928194";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

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
      <div
        className="modal-content bg-white rounded-lg shadow-2xl w-full h-full p-4 sm:max-w-lg sm:h-auto sm:rounded-lg"
        data-aos="fade-in"
        data-aos-duration="300"
        style={{ boxShadow: "1px 1px 20px black" }}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-black text-center mb-4">
          Carrito de Compras
        </h2>

        {cart && cart.products.length > 0 ? (
          <>
            <ul className="space-y-4 overflow-y-auto max-h-60">
              {cart.products.map((product) => (
                <li
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <img
                      src={`https://videojuegos-7gih.onrender.com${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="product-name text-sm sm:text-base font-semibold text-truncate">
                        {product.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {product.quantity} x{" "}
                        {product.price.toLocaleString("es-CO")} COP
                      </p>
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-bold mt-2 sm:mt-0">
                    {(product.price * product.quantity).toLocaleString("es-CO")}{" "}
                    COP
                  </span>
                  <button
                    className="text-red-500 ml-2 text-sm"
                    onClick={() => removeProduct(product._id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Total:{" "}
                {cart.products
                  .reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  )
                  .toLocaleString("es-CO")}{" "}
                COP
              </p>
              <button
                className="w-full mt-4 bg-[#f7002f] hover:bg-[#f04968] text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all"
                onClick={handleProceedToPayment}
              >
                Proceder al pago
              </button>
              <button
                className="w-full mt-2 bg-black hover:bg-[#494848] text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all"
                onClick={clearCart}
              >
                Limpiar Carrito
              </button>
            </div>
          </>
        ) : (
          <p className="mt-4 text-gray-500 text-center">
            Tu carrito está vacío.
          </p>
        )}
      </div>
    </div>
  );
}

export default CartModal;
