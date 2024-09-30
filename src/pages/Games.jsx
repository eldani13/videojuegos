import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

function Games() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products'); 
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <Header />

      <div className="mx-auto mt-8">
        <div className="flex justify-center mb-6 space-x-4">
          {['Todos', 'Acción', 'Lucha', 'Aventura', 'Arcade', 'Deportes', 'Estrategia', 'Simulación'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Games;
