import React, { useState } from 'react';
import Loading from '../components/Loading'; 

function Dashboard() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
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
        setImage(null);
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
    </div>
  );
}

export default Dashboard;
