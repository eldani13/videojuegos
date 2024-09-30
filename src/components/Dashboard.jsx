import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading'; 

function Dashboard() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [discount, setDiscount] = useState(''); 
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Todos'); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); 
  const [fetchLoading, setFetchLoading] = useState(true); 
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setMessage('Error al cargar los productos: ' + error.message);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('oldPrice', oldPrice); 
    formData.append('discount', discount);
    formData.append('category', category); 
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('Producto subido exitosamente!');
        setName('');
        setDescription('');
        setPrice('');
        setOldPrice(''); 
        setDiscount('');
        setImage(null);
        setCategory('Todos'); 
        fetchProducts(); 
      } else {
        setMessage(data.message || 'Error al subir el producto.');
      }
    } catch (error) {
      setMessage('Error en la conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      
      {/* Formulario para agregar productos */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-red-500 font-semibold">Nombre del Producto:</label>
          <input
            type="text"
            placeholder='Nombre del producto'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Viejo Precio:</label>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Descuento:</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Categoría:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="Todos">Todos</option>
            <option value="Acción">Acción</option>
            <option value="Lucha">Lucha</option>
            <option value="Aventura">Aventura</option>
            <option value="Arcade">Arcade</option>
            <option value="Deportes">Deportes</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Simulación">Simulación</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Imagen del Producto:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          {image && (
            <div className="mt-2">
              <p className="font-semibold">Previsualización:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Previsualización"
                className="w-full h-auto rounded mt-2"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white font-bold flex justify-center items-center`}
        >
          {loading ? <Loading /> : 'Subir Producto'}
        </button>

        {message && <p className="mt-2 text-center text-green-600">{message}</p>}
      </form>

      <h2 className="text-xl font-bold mt-8">Productos</h2>
      {fetchLoading ? (
        <Loading />
      ) : (
        <ul className="space-y-4 mt-4">
          {products.map((product) => (
            <li key={product._id} className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
              {product.oldPrice && <p>Precio Anterior: ${product.oldPrice}</p>}
              {product.discount && <p>Descuento: {product.discount}%</p>}
              {product.image && <img src={product.image} alt={product.name} className="w-full h-auto rounded mt-2" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
