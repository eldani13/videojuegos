import React from 'react';

function Product({ product, onDelete }) {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/products/${product._id}`, { 
      method: 'DELETE',
    });

    if (res.ok) {
      onDelete(product._id);
    } else {
      console.error('Error al eliminar el producto:', await res.json());
    }
  };

  return (
    <div className="productos flex flex-col gap-4 justify-center items-center">
      <span className='text-3xl font-bold'>{product.name}</span>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {product.image && (
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          width={150}
        />
      )}
      <button onClick={handleDelete} className='p-4 bg-[#f7002f] rounded-3xl'>
        Eliminar Producto
      </button>
    </div>
  );
}

export default Product;
