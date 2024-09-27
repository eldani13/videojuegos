import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/layouts/Header";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <div>
      <Header />
      <h1 className="title">Bienvenido a nuestra tienda</h1>
      <div className="container grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
