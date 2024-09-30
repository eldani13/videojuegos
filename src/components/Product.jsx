import React, { useState } from "react";

function Product({ product, onDelete, onAddToCart, isDashboard }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Producto agregado al carrito con éxito");
        onAddToCart(data.cart);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setMessage("Error al añadir al carrito.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 duration-300 w-80 mx-auto mb-10">
      {product.discount && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
          {product.discount}% OFF
        </div>
      )}
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="h-64 w-full object-cover rounded-t-lg"
      />
      <div className="p-4 text-center">
        <h5 className="text-lg font-semibold text-gray-900 uppercase">{product.name}</h5>
        <p className="text-sm text-gray-600">{product.category}</p>
        <div className="my-2">
          {product.oldPrice && (
            <p className="text-gray-500 text-sm line-through">{product.oldPrice} COP</p>
          )}
          <p className="text-xl font-bold text-green-600">{product.price} COP</p>
          {product.discount && (
            <p className="text-sm text-red-600 font-semibold">Oferta disponible</p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">{product.description}</p>
      </div>

      <div className="flex w-full">
        {!isDashboard && (
          <div className="p-4 w-full">
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <p className="ml-2">Cargando...</p>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Comprar
              </button>
            )}
          </div>
        )}

        <div className="p-4 w-full">
          <button
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={() => window.alert(`Ver producto: ${product.name}`)}
          >
            <span role="img" aria-label="eye">
              👁️
            </span>{" "}
            Ver
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`text-center mt-2 text-sm ${
            message.startsWith("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Product;
