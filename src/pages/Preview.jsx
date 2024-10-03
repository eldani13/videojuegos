import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

function Preview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.log("Error al obtener el producto:", error));
  }, [productId]);

  if (!product) {
    return (
      <p className="text-center text-xl text-gray-600">Cargando producto...</p>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="lg:w-1/2 w-full">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="lg:w-1/2 w-full text-left space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold text-green-600 mb-4">
              Precio: {product.price} COP
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Descripción: {product.description}
            </p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Características de FIFA:
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Modos de juego: Ultimate Team, Carrera, Volta</li>
                <li>
                  Número de jugadores: Multijugador local y en línea (1-22
                  jugadores)
                </li>
                <li>Gráficos mejorados con HyperMotion Technology</li>
                <li>
                  Equipos y ligas oficiales: más de 700 equipos y 30 ligas
                </li>
                <li>Soporte para juego cruzado en plataformas seleccionadas</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Categoría:
              </h3>
              <span className="inline-block px-4 py-2 bg-gray-200 rounded-full text-gray-700 font-medium">
                {product.category}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-md text-gray-600">
                Entrega estimada: Inmediata
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <button className="w-full lg:w-auto px-8 py-3 bg-green-500 text-white text-lg rounded-lg shadow-lg hover:bg-green-600 transition-all">
                Solicítalo aquí
              </button>
              <button className="w-full lg:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
                Compartir Producto
              </button>
              <button className="w-full lg:w-auto px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Preview;
