import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Logo from "../img/logo.png";
import EditProduct from "./EditProduct";
import Features from "./Features";

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
  const [features, setFeatures] = useState([""]);
  const [type, setType] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  const handleToggleFeatured = async (productId, currentFeaturedState) => {
    try {
      const newFeaturedState = !currentFeaturedState;

      const res = await fetch(
        `http://localhost:5000/api/products/${productId}/highlight`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFeatured: newFeaturedState }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Producto actualizado exitosamente!");

        fetchProducts();

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, isFeatured: newFeaturedState }
              : product
          )
        );

        if (newFeaturedState) {
          setFeaturedProducts((prevFeaturedProducts) => [
            ...prevFeaturedProducts,
            { ...data, isFeatured: newFeaturedState },
          ]);
        } else {
          setFeaturedProducts((prevFeaturedProducts) =>
            prevFeaturedProducts.filter((product) => product._id !== productId)
          );
        }
      } else {
        setMessage(data.message || "Error al actualizar el producto.");
      }
    } catch (error) {
      setMessage("Error en la conexión: " + error.message);
    }
  };

  const handleHighlight = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}/highlight`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isFeatured: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al destacar el producto");
      }

      const updatedProduct = await response.json();
      console.log("Producto actualizado:", updatedProduct);

      setFeaturedProducts((prev) => [...prev, updatedProduct]);
    } catch (error) {
      console.error(error);
    }
  };

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
        const featured = data.filter((product) => product.isFeatured);
        setFeaturedProducts(featured);
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
    formData.append("type", type);

    features.forEach((feature) => {
      formData.append("features[]", feature);
    });

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
        setFeatures([""]);
        setType("");
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

  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDelete = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!productIdToDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage("Producto eliminado exitosamente.");
        fetchProducts();
      } else {
        setMessage(data.message || "Error al eliminar el producto.");
      }
    } catch (error) {
      setMessage("Error en la conexión: " + error.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
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
          <h1 className="text-center pb-10 text-3xl transform transition duration-500">
            Agregar producto
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="product-name"
              >
                Nombre del Producto:
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="Ingresa el nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="description"
              >
                Descripción:
              </label>
              <input
                id="description"
                type="text"
                placeholder="Escribe una breve descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="price"
              >
                Precio:
              </label>
              <input
                id="price"
                type="number"
                placeholder="Ej. 19.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="old-price"
              >
                Viejo Precio:
              </label>
              <input
                id="old-price"
                type="number"
                placeholder="Ej. 29.99"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="discount"
              >
                Descuento (%):
              </label>
              <input
                id="discount"
                type="number"
                placeholder="Ej. 10"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="category"
              >
                Categoría:
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200"
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
              <label className="block font-semibold mb-2 uppercase">
                Características:
              </label>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Característica del producto"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Agregar Característica
              </button>
            </div>

            <div>
              <label
                className="block font-semibold mb-2 uppercase"
                htmlFor="type"
              >
                Consola:
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200"
              >
                <option value="PS4">PS4</option>
                <option value="PS5">PS5</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 uppercase">
                Imagen:
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f7002f] text-white font-bold py-3 rounded-md hover:bg-black transition duration-200"
            >
              {loading ? "Subiendo..." : "Agregar Producto"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-center pb-10 text-3xl transform transition duration-500">
            Productos actuales
          </h1>
          {fetchLoading ? (
            <Loading />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
                >
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded mb-4"
                  />

                  <div className="flex-grow">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-black mb-1 text-justify line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-black font-semibold">
                      Precio:
                      <span className="text-[#f7002f] ml-1">
                        ${product.price.toLocaleString("es-CO")} COP{" "}
                        {product.oldPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.oldPrice}
                          </span>
                        )}
                      </span>
                    </p>
                  </div>

                  {localStorage.getItem("token") && (
                    <div className="flex gap-2 mt-4">
                      <button
                        className="bg-black text-white py-2 px-4 rounded w-full transition duration-300 hover:bg-gray-800"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded w-full transition duration-300 hover:bg-red-600"
                        onClick={() => {
                          setProductIdToDelete(product._id);
                          setShowModal(true);
                        }}
                      >
                        Eliminar
                      </button>
                      <button
                        className={`py-2 px-4 rounded w-full transition duration-300 ${
                          product.isFeatured
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() =>
                          handleToggleFeatured(product._id, product.isFeatured)
                        }
                      >
                        {product.isFeatured ? "Quitar" : "Destacar"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No hay productos disponibles.</p>
          )}
        </div>

        {featuredProducts.length > 0 && (
          <Features products={featuredProducts} />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 bg-gray-500 text-white py-1 px-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

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
