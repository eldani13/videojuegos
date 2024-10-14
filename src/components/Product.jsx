import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ps4 from "../assets/ps4.svg";
import ps5 from "../assets/ps5.svg";

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

  console.log("Tipo de producto:", product.type);
  console.log(product.type);

  return (
    <div className="relative flex flex-col justify-between items-center rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 duration-300 w-80 mx-auto mb-10 border-4 border-white p-2">
      <div className="relative w-full">
        {product.discount && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
            {product.discount}% OFF
          </div>
        )}
      </div>
      {/* {product.discount && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
          {product.discount}% OFF
        </div>
      */}
      <div className="relative w-full h-[350px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded-lg"
        />

        <div className="absolute bottom-2 left-2">
          {product.type === "PS4" && (
            <img src={ps4} alt="PS4" className="h-12 w-12" />
          )}
          {product.type === "PS5" && (
            <img src={ps5} alt="PS5" className="h-12 w-12" />
          )}
        </div>
      </div>

      <div className="p-4 text-center flex-grow flex flex-col justify-between h-full">
        <h5 className="text-lg font-semibold text-gray-900 uppercase line-clamp-1">
          {product.name}
        </h5>
        <p className="text-sm text-gray-600">{product.category}</p>

        <div className="my-2 flex flex-col items-center">
          <div className="flex justify-around items-center w-full">
            {product.oldPrice && (
              <p className="text-gray-500 text-sm line-through">
                {product.oldPrice.toLocaleString("es-CO")} COP{" "}
              </p>
            )}
            <p className="text-xl font-bold text-[#f7002f]">
              ${product.price.toLocaleString("es-CO")} COP{" "}
            </p>
          </div>
          {product.discount && (
            <p className="text-sm text-red-600 font-semibold">
              Oferta disponible
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="mt-auto flex w-full">
        {!isDashboard && (
          <div className="p-4 w-full">
            {loading ? (
              <Loading message="Cargando..." />
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-2 bg-[#f7002f] text-white font-semibold rounded-lg hover:bg-[#f04968] transition-colors duration-300 uppercase text-xs"
              >
                Comprar
              </button>
            )}
          </div>
        )}

        <div className="p-4 w-full">
          <button
            className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-[#494848] transition-colors duration-300 uppercase text-xs flex justify-center items-center gap-2"
            onClick={handleViewProduct}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M43.5 24a22.505 22.505 0 0 0-39 0"
              />
              <circle
                cx="24"
                cy="24"
                r="7.889"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 24a22.505 22.505 0 0 0 39 0"
              />
            </svg>
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
