import React, { useState } from "react";
import { setCookie, getCookie } from "../utils/cookieUtils";
import Preview from "../pages/Preview";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Product({ product, onDelete, onAddToCart, isDashboard }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onAddToCart(product);
      setMessage("Juego añadido al carrito");
      setModalOpen(true);
    } catch (error) {
      setMessage("Error al añadir al carrito.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = () => {
    navigate(`/preview/${product._id}`);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 duration-300 w-80 mx-auto mb-10">
      {product.discount && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
          {product.discount}% OFF
        </div>
      )}
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="h-64 w-full object-cover rounded-t-lg"
      />
      <div className="p-4 text-center">
        <h5 className="text-lg font-semibold text-gray-900 uppercase">
          {product.name}
        </h5>
        <p className="text-sm text-gray-600">{product.category}</p>
        <div className="my-2">
          {product.oldPrice && (
            <p className="text-gray-500 text-sm line-through">
              {product.oldPrice} COP
            </p>
          )}
          <p className="text-xl font-bold text-green-600">
            {product.price} COP
          </p>
          {product.discount && (
            <p className="text-sm text-red-600 font-semibold">
              Oferta disponible
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">{product.description}</p>
      </div>

      <div className="flex w-full">
        {!isDashboard && (
          <div className="p-4 w-full">
            {loading ? (
              <Loading message="Cargando..." />
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-2 bg-[#f7002f] text-white font-semibold rounded-lg hover:bg-[#f04968] transition-colors duration-300"
              >
                Comprar
              </button>
            )}
          </div>
        )}

        <div className="p-4 w-full">
          <button
            className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-[#494848] transition-colors duration-300"
            onClick={handleViewProduct}
          >
            Ver
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">{message}</h2>
            <button
              onClick={handleCloseModal}
              className="py-2 px-4 bg-[#f7002f] text-white rounded-lg hover:bg-[#f04968] transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
