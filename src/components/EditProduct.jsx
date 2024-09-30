import React, { useEffect, useState } from "react";

function EditProduct({ product, onSave, onCancel }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [oldPrice, setOldPrice] = useState(product.oldPrice);
  const [discount, setDiscount] = useState(product.discount);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState(product.category); 

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
    const updatedProduct = { name, description, price, oldPrice, discount, category, image };
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
      alert("Error al guardar el producto. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio" />
      <input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="Precio Anterior" />
      <input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Descuento (%)" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="URL de Imagen" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoría" /> 

      <button onClick={handleSave}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default EditProduct;
