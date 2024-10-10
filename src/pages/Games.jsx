import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { CartUtils } from "../utils/cartUtils";
import contact from "../img/contact.webp";

function Games() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const cartUtils = new CartUtils();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://backend-videojuegos.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(cartUtils.appendProductInCart(product));
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <Header />

      <div className="mx-auto mt-8 max-w-screen-lg px-4">
        <div className="overflow-x-auto mb-6">
          <div className="flex space-x-4 min-w-full">
            {[
              "Todos",
              "Acción",
              "Lucha",
              "Aventura",
              "Arcade",
              "Deportes",
              "Estrategia",
              "Simulación",
            ].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } transition duration-200`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 mb-[79px] w-full">
            <div className="relative w-full h-96 bg-gradient-to-r from-black to-gray-500 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${contact})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              <div className="relative z-10 text-center p-6">
                <h2 className="text-3xl font-bold text-white mb-2 animate-bounce">
                  ¡Juegos muy pronto!
                </h2>
                <p className="text-lg text-white opacity-90">
                  Estamos trabajando para traerte los mejores títulos.
                </p>
                <p className="text-md text-white mt-4">
                  Vuelve pronto para descubrir nuevas aventuras.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
            {filteredProducts.map((product) => (
              <Product
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Games;
