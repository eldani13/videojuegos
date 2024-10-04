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

  const clearCart = () => {
    setCart({ products: [] });
    setCookie("shopping_cart", JSON.stringify({ products: [] })); 
  };

  const removeProduct = (productId) => {
    const updatedProducts = cart.products.filter(product => product._id !== productId);
    setCart({ products: updatedProducts });
    setCookie("shopping_cart", JSON.stringify({ products: updatedProducts })); 
  };

  const emojiApiKey = '948dcf1535f6cd55e11585b441d65b38b52927cd';

  const getEmoji = async (emojiName) => {
    try {
      const response = await axios.get(`https://emoji-api.com/emojis?access_key=${emojiApiKey}`);
      const emojis = response.data;
      
      const emoji = emojis.find(e => e.slug === emojiName);
      return emoji ? emoji.character : '❓'; 
    } catch (error) {
      console.error("Error al obtener emojis:", error);
      return '❓'; 
    }
  };

  const handleProceedToPayment = () => {
    if (!cart || cart.products.length === 0) return;
  
    const cartEmoji = '🛒';  
    const quantityEmoji = '🔢';  
    const moneyEmoji = '💰'; 
    const totalEmoji = '💳';  
    const thankYouEmoji = '🎉';  
  
    const message = cart.products.map(product => 
      `${cartEmoji} *${product.name}*\n${quantityEmoji} **Cantidad**: ${product.quantity}\n${moneyEmoji} **Precio Unitario**: ${product.price} COP\n${moneyEmoji} **Subtotal**: ${product.price * product.quantity} COP\n📦 **Descripción**: Un producto de alta calidad que garantiza satisfacción.\n`
    ).join(''); 
  
    const total = cart.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  
    const finalMessage = `Hola, estoy interesado en los siguientes productos:\n\n${message}\n${totalEmoji} **Total a Pagar**: ${total} COP\n\n${thankYouEmoji} ¡Gracias por tu atención! Espero tu respuesta.`;
    
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
      <div className="modal-content bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative" style={{
        boxShadow: '1px 1px 20px black'
      }}>
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Carrito de Compras</h2>
        
        {cart && cart.products && cart.products.length > 0 ? (
          <>
            <ul className="space-y-4 overflow-y-auto max-h-60">
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
                  <button 
                    className="text-red-500 ml-4"
                    onClick={() => removeProduct(product._id)}
                  >
                    Eliminar
                  </button>
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
              <button 
                className="w-full mt-4 bg-[#f7002f] hover:bg-[#f04968] text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all"
                onClick={handleProceedToPayment} // Cambiado aquí
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
          <p className="mt-4 text-gray-500 text-center">Tu carrito está vacío.</p>
        )}
      </div>
    </div>
  );
}

export default CartModal;
