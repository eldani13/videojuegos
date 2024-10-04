import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Logo from "../img/logo.png";
import EditProduct from "./EditProduct";

function Dashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Todos");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        setMessage("Error al cargar los productos: " + data.message);
      }
    } catch (error) {
      setMessage("Error al cargar los productos: " + error.message);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("oldPrice", oldPrice);
    formData.append("discount", discount);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Producto subido exitosamente!");
        setName("");
        setDescription("");
        setPrice("");
        setOldPrice("");
        setDiscount("");
        setImage(null);
        setCategory("Todos");
        fetchProducts();
      } else {
        setMessage(data.message || "Error al subir el producto.");
      }
    } catch (error) {
      setMessage("Error en la conexión: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    fetchProducts(); 
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#f7002f] p-4 shadow-md flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold flex justify-center items-center gap-8">
          <img src={Logo} alt="Logo" className="w-16" />
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-black hover:bg-[#494848] text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="container mx-auto mt-10 p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-red-500 font-semibold">
            Nombre del Producto:
          </label>
          <input
            type="text"
            placeholder="Nombre del producto"
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
          className={`w-full py-2 rounded ${
            loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          } text-white font-bold flex justify-center items-center`}
        >
          {loading ? <Loading /> : "Subir Producto"}
        </button>

        {message && (
          <p className="mt-2 text-center text-green-600">{message}</p>
        )}
      </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Productos Actuales</h2>
          {fetchLoading ? (
            <Loading />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-black mb-1 text-justify">
                    {product.description}
                  </p>
                  <p className="text-black font-semibold">
                    Precio: 
                    <span className="text-[#f7002f] ml-1">
                      ${product.price}
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.oldPrice}
                        </span>
                      )}
                    </span>
                  </p>
                  {localStorage.getItem("token") && (
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No hay productos disponibles.</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <EditProduct
              product={selectedProduct}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
