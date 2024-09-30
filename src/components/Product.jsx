import React, { useState } from "react";

function Product({ product, onDelete, onAddToCart }) {
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
        onAddToCart(data.cart); // Callback para actualizar el carrito en el frontend si lo necesitas
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
    <div className="relative flex flex-col items-center rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 duration-300 w-80 mx-auto">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="h-64 w-full object-cover rounded-t-lg"
      />
      <div className="p-4 text-center">
        <h5 className="text-2xl font-semibold text-gray-900 uppercase">{product.name}</h5>
        <p className="text-gray-600 text-sm my-2 uppercase">{product.description}</p>
        <p className="text-xl font-semibold text-red-600 mt-4">{product.price} COP</p>
        <p className="text-xs text-gray-500 mt-2">{product.category || "Sin categoría"}</p>
      </div>
      <div className="p-4 w-full">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Añadir al carrito
          </button>
        )}
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default Product;
