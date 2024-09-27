import React from 'react';

function Product({ product, onDelete }) {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/products/${product._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      onDelete(product._id); 
    }
  };

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {product.image && <img src={`http://localhost:5000${product.image}`} alt={product.name} />}
      <button onClick={handleDelete}>Eliminar Producto</button>
    </div>
  );
}

export default Product;
