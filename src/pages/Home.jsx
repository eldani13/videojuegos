import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Slider from "../components/layouts/Slider";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products"); 
      if (!response.ok) {
        console.error("Error fetching products:", response.statusText);
        return;
      }
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error("Error deleting product:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Header />
      <Slider />
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
      <Footer />
    </div>
  );
}

export default Home;
