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
    <div className="relative max-w-xs rounded-lg bg-[#f7002f] text-white shadow-lg transition-transform transform hover:scale-105 duration-300">
      <img 
        src={`http://localhost:5000${product.image}`} 
        alt={product.name} 
        className="h-64 w-full object-cover rounded-t-lg" 
      />
      
      <div className="p-4">
        <h5 className="mb-2 text-lg font-bold">{product.name}</h5>

        <p className="mb-2 text-sm text-gray-300">{product.description}</p>

        <p className="text-2xl font-semibold text-white">Desde {product.price} COP</p>

        <p className="text-xs text-black mt-1">{product.category || 'Sin categoría'}</p>

        <button 
          onClick={handleDelete} 
          className="absolute bottom-4 right-4 px-3 py-1 bg-red-600 text-sm rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Eliminar
        </button>
      </div>


    </div>
  );
}

export default Product;
