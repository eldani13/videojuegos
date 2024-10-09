import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import ps4 from "../assets/ps4.svg";
import ps5 from "../assets/ps5.svg";

function Features({ products = [], isDashboard }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (products.length === 0) {
    return (
      <h1 className="text-center pb-10 text-3xl transform transition duration-500">
        No hay productos destacados
      </h1>
    );
  }

  const handleViewProduct = (productId) => {
    navigate(`/preview/${productId}`);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-center pb-10 text-3xl transform transition duration-500">
        Productos destacados
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative flex flex-col justify-between items-center rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 hover:opacity-90 hover:shadow-2xl duration-300 w-80 mx-auto mb-10 border-4 border-white p-2"
            data-aos="fade-up"
          >
            <div className="relative w-full">
              {product.discount && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            <div className="relative w-full h-[350px]">
              <img
                src={`https://videojuegos-7gih.onrender.com${product.image}`}
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
              <div className="my-2">
                <p className="text-xl font-bold text-[#f7002f]">
                  ${product.price.toLocaleString("es-CO")} COP
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2 line-clamp-3 flex-grow text-justify">
                {product.description}
              </p>
            </div>

            <div className="mt-auto flex w-full">
              {!isDashboard && (
                <div className="p-4 w-full">
                  <button
                    onClick={() => handleViewProduct(product._id)}
                    className="w-full flex justify-center items-center gap-3 py-2 bg-black text-white font-semibold rounded-lg hover:bg-[#494848] transition-colors duration-300 uppercase text-xs"
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
