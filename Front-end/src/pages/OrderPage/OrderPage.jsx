import React, { useState, useEffect } from 'react';
import './OrderPage.css';

const OrderPage = () => {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [comment, setComment] = useState('');

  // Função abstrata para buscar itens para o dropdown
  const fetchDropdownItems = async () => {
    // Simula uma chamada para uma API
    const response = await fetch('http://localhost:5000/produtos');
    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
    } else {
      setDropdownItems(data);
    }
  };

  useEffect(() => {
    fetchDropdownItems();
  }, []);

  const handleSubmit = () => {
    if (!selectedItem) {
      alert('Por favor, selecione um item.');
      return;
    }

    if (!comment.trim()) {
      alert('Por favor, insira um comentário.');
      return;
    }

    const message = `Olá, gostaria de fazer uma encomenda:\n\nItem: ${selectedItem}\nObservação: ${comment}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="order-container">
      <h1>Faça sua Encomenda</h1>

      <div className="dropdown-section">
        <label htmlFor="dropdown">Selecione um Item</label>
        <select
          id="dropdown"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">Selecione...</option>
          {dropdownItems.map((item) => !item.disponivel ? (
            <option key={item.id} value={item.nome}>
              {item.nome}
            </option>
          ) : '')}
        </select>
      </div>

      <div className="comment-section">
        <label htmlFor="comment">Observação</label>
        <textarea
          id="comment"
          cols="50"
          rows="7"
          placeholder="Escreva sua observação aqui..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Enviar Encomenda via WhatsApp
      </button>
    </div>
  );
};

export default OrderPage;
