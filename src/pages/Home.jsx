import React, { useState, useEffect } from "react";
import AOS from "aos"; 
import "aos/dist/aos.css";
import Product from "../components/Product";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Slider from "../components/layouts/Slider";
import Buy from "../components/Buy";
import Client from "../components/layouts/Client";
import Features from "../components/Features";
import { CartUtils } from "../utils/cartUtils";
import Loading from "../components/Loading";

import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const cartUtils = new CartUtils();

  useEffect(() => {
    AOS.init(); 
    const fetchProducts = async () => {
      const response = await fetch("https://videojuegos-7gih.onrender.com/api/products");
      if (!response.ok) {
        console.error("Error fetching products:", response.statusText);
        return;
      }
      const data = await response.json();
      setProducts(data);

      const featured = data.filter(product => product.isFeatured);
      setFeaturedProducts(featured);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(cartUtils.appendProductInCart(product));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(
        `https://videojuegos-7gih.onrender.com/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

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
      <Buy />
      <Features products={featuredProducts} />


      {/* <div className="h-36">
        <h1 className="title flex justify-center text-2xl md:text-4xl font-semibold p-6 text-center">
          JUEGOSﾠ<span className="text-[#f7002f]"> PARA TODOS</span>
        </h1>
      </div> */}

      {/* <div
        className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] px-5"
        style={{
          columnGap: "70px",
        }}
      >
        {products.map((product) => (
          <div key={product._id} data-aos="fade-up"> 
            <Product
              product={product}
              onDelete={handleDeleteProduct}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div> */}
      <Client />
      <Footer />
    </div>
  );
}

export default Home;
