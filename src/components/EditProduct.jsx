import React, { useEffect, useState } from "react";

function EditProduct({ product, onSave, onCancel }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [oldPrice, setOldPrice] = useState(product.oldPrice);
  const [discount, setDiscount] = useState(product.discount);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image); 
  const [category, setCategory] = useState(product.category);
  const [newImage, setNewImage] = useState(null); 

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setOldPrice(product.oldPrice);
    setDiscount(product.discount);
    setDescription(product.description);
    setImage(product.image); 
    setCategory(product.category);
  }, [product]);

  const handleSave = async () => {
    let updatedProduct = { 
      name, 
      description, 
      price, 
      oldPrice, 
      discount, 
      category 
    };

    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("data", JSON.stringify(updatedProduct));

      try {
        const res = await fetch(`http://localhost:5000/api/products/${product._id}`, {
          method: "PUT",
          body: formData, 
        });

        if (res.ok) {
          onSave(); 
        } else {
          const errorData = await res.json();
          console.error("Error al guardar el producto:", errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error de red:", error);
        alert("Error al conectar con el servidor");
      }
    } else {
      updatedProduct.image = image;
      try {
        const res = await fetch(`http://localhost:5000/api/products/${product._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });

        if (res.ok) {
          onSave(); 
        } else {
          const errorData = await res.json();
          console.error("Error al guardar el producto:", errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error de red:", error);
        alert("Error al conectar con el servidor");
      }
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); 
  };

  return (
    <div className="p-4 md:p-8 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
      <div className="space-y-4">
        <div>
          <label>Nombre del producto</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Precio Anterior</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Descuento (%)</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div>
          <label>Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
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
          <label>Imagen Actual</label>
          {image && <img src={`http://localhost:5000${image}`} alt="Producto" className="mb-2 w-24 h-24 object-cover" />}
        </div>
        <div>
          <label>Cargar Nueva Imagen</label>
          <input
            type="file"
            className="border p-2 w-full"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded flex-1" onClick={handleSave}>
            Guardar Cambios
          </button>
          <button className="bg-gray-300 text-black py-2 px-4 rounded flex-1" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
