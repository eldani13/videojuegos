import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { BsCart, BsShare, BsWhatsapp } from "react-icons/bs";
import Loading from "../components/Loading";
import ps4 from "../assets/ps4.svg";
import ps5 from "../assets/ps5.svg";

function Preview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://backend-videojuegos.onrender.com/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleWhatsAppClick = () => {
    if (product) {
      const message =
        `🌟 *Hola,*\n` +
        `Estoy interesado en el producto *"${product.name}"*.\n` +
        `💰 *Precio:* ${product.price.toLocaleString("es-CO")} COP\n\n` +
        `✨ *Características:* \n` +
        `${product.features.map((feature) => `- ${feature}`).join("\n")}\n\n` +
        `📦 *Categoría:* ${product.category}\n` +
        `🤝 Espero tu respuesta. ¡Gracias!`;

      const phoneNumber = "+573011940150";

      const encodedMessage = encodeURIComponent(message);

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    }
  };

  const handleShareClick = () => {
    const shareData = {
      title: product.name,
      text: `¡Mira este increíble producto! 🌟 ${product.name}\nPrecio: ${product.price.toLocaleString("es-CO")} COP\n\n¡Haz clic aquí para verlo! 👇`,
      url: `https://videojuegos-rose.vercel.app/preview/${productId}`, 
    };
  
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Producto compartido exitosamente"))
        .catch((error) =>
          console.error("Error al compartir el producto:", error)
        );
    } else {
      const fallbackUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareData.url
      )}`;
      window.open(fallbackUrl, "_blank");
    }
  };
  

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const currentCart = getCartFromCookies();
      const existingProductIndex = currentCart.products.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex > -1) {
        currentCart.products[existingProductIndex].quantity += 1;
      } else {
        currentCart.products.push({ ...product, quantity: 1 });
      }

      setCookie("shopping_cart", JSON.stringify(currentCart));
      setMessage("Juego añadido al carrito");
      setModalOpen(true);
    } catch (error) {
      setMessage("Error al añadir al carrito.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Cargando producto..." />;
  }

  if (!product) {
    return (
      <p className="text-center text-xl text-gray-600">
        Producto no encontrado.
      </p>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mt-[9.7vh] justify-center">
          <div className="lg:w-96 w-72">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="lg:w-1/2 w-full text-left space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-extrabold mb-4">
              Precio:{" "}
              <span className="text-[#f7002f]">
                ${product.price.toLocaleString("es-CO")} COP{" "}
              </span>
            </p>

            <p className="text-lg font-extrabold text-black leading-relaxed mb-4">
              Descripción:{" "}
              <span className="font-normal">{product.description}</span>
            </p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Características de{" "}
                <span className="text-[#f7002f]">{product.name}</span>:
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {Array.isArray(product.features) &&
                  product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
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
              <h3 className="text-lg font-semibold text-gray-900">Consola:</h3>
              <div className="flex items-center">
                {product.type === "PS4" && (
                  <img src={ps4} alt="PS4" className="w-16 h-16" />
                )}
                {product.type === "PS5" && (
                  <img src={ps5} alt="PS5" className="w-16 h-16" />
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-md text-black">
                <span className="font-semibold text-lg">Entrega estimada:</span>{" "}
                Inmediata
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex justify-center items-center gap-2 font-semibold text-xs lg:w-auto px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all"
              >
                <BsWhatsapp className="text-gray-800 hover:text-gray-600 w-5 h-5" />
                Solicítalo aquí
              </button>
              <button
                className="w-full text-xs font-semibold flex justify-center items-center gap-2 lg:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                onClick={handleShareClick}
              >
                <BsShare className="text-gray-800 hover:text-gray-600 w-5 h-5" />
                Compartir Producto
              </button>
              {/* <button
                onClick={handleAddToCart}
                className="w-full text-xs lg:w-auto px-6 py-2 bg-[#f7002f] font-semibold text-white rounded-lg shadow-md hover:bg-[#f04968] transition-all flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loading message="Cargando..." />
                ) : (
                  <>
                    <BsCart className="text-gray-800 hover:text-gray-600 w-5 h-5" />
                    Agregar al Carrito
                  </>
                )}
              </button> */}
            </div>

            {/* {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                  <p className="text-lg">{message}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setModalOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Preview;
