import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [colors, setColors] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [allowOrder, setAllowOrder] = useState(false);

  const handleColorAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setColors([...colors, e.target.value.trim()]);
      e.target.value = ''; // Limpa o input de cores
    }
  };

  const handleColorRemove = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !photo) {
      alert('O nome do produto e a foto são obrigatórios.');
      return;
    }

    const productData = {
      productName,
      quantity: parseInt(quantity, 10),
      colors,
      allowOrder,
    };

    console.log('Produto enviado:', productData);
    alert('Produto enviado com sucesso!');
    // Aqui você pode fazer a chamada à API para salvar o produto
  };

  return (
    <div className="admin-container">
      <h1>Administração de Produtos</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="productName">Nome do Produto</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Digite o nome do produto"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Digite a quantidade disponível"
          />
          <div className="allow-order">
            <input
            type="checkbox"
            id="allowOrder"
            checked={allowOrder}
            onChange={(e) => setAllowOrder(e.target.checked)}
            />
            <label htmlFor="allowOrder">Permitir pedidos fora de estoque</label>
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="colors">Cores Disponíveis</label>
          <input
            type="text"
            id="colors"
            placeholder="Digite uma cor e pressione Enter"
            onKeyDown={handleColorAdd}
          />
          <div className="colors-list">
            {colors.map((color, index) => (
              <span key={index} className="color-tag">
                {color}
                <button type="button" onClick={() => handleColorRemove(color)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Foto do Produto</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default Admin;
