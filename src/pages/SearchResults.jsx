import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Product from "../components/Product";
import AOS from "aos";
import "aos/dist/aos.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get("q");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("https://backend-videojuegos.onrender.com//api/products/");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredGames(
        games.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, games]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleAddToCart = (addedProduct) => {
    setCart((prevCart) => [...prevCart, addedProduct]);
    console.log("Producto añadido al carrito:", addedProduct);
  };

  return (
    <div>
      <Header />
      <div className="text-center py-8">
        <h1 className="title text-4xl font-semibold uppercase text-black">
          Resultado de búsqueda para:{" "}
          <span className="text-[#f7002f]">{searchTerm}</span>
        </h1>
      </div>
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div data-aos="fade-up" data-aos-duration="500" key={game._id}>
              <Product
                product={game}
                onAddToCart={handleAddToCart}
                onDelete={(productId) =>
                  console.log("Producto eliminado:", productId)
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <span className="text-6xl font-bold text-red-600">404</span>
          <span className="text-2xl font-semibold text-gray-800">
            NOT FOUND
          </span>
          <p className="mt-4 text-gray-600">
            Lo sentimos, no hemos encontrado resultados para tu búsqueda.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
          >
            Volver a la página principal
          </a>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default SearchResults;
