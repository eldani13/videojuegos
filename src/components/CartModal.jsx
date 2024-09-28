import React from 'react';
import '../styles/CartModal.css' 

function CartModal({ isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Carrito de Compras</h2>
        
        <p>Tu carrito está vacío.</p>
      </div>
    </div>
  );
}

export default CartModal;
