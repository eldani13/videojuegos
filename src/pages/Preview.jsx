import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Preview() {
  const { productId } = useParams();  // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.log("Error al obtener el producto:", error));
  }, [productId]);

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <img src={`http://localhost:5000${product.image}`} alt={product.name} />
      <p>Precio: {product.price} COP</p>
    </div>
  );
}

export default Preview;
