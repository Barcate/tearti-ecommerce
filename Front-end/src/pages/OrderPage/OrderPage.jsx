import React, { useState, useEffect } from 'react';
import './OrderPage.css';

const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulação de produtos recebidos de uma API
    const fetchProducts = () => {
      const productsData = [
        {
          id: 1,
          name: 'Cachecol de Lã',
          availableColors: ['Verde', 'Azul', 'Vermelho'],
          acceptsOrder: true,
        },
        {
          id: 2,
          name: 'Camiseta Personalizada',
          availableColors: ['Preto', 'Branco', 'Cinza'],
          acceptsOrder: false,
        },
        {
          id: 3,
          name: 'Mochila Escolar',
          availableColors: ['Preto', 'Cinza'],
          acceptsOrder: true,
        },
      ];
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleSubmit = () => {
    if (!selectedProduct || !selectedColor) {
      alert('Por favor, selecione um produto e uma cor.');
      return;
    }

    const message = `Olá, gostaria de encomendar:\n\nProduto: ${selectedProduct.name}\nCor: ${selectedColor}\nQuantidade: ${quantity}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="order-container">
      <h1>Faça sua Encomenda</h1>

      <div className="product-selection">
        <label htmlFor="product">Escolha o Produto</label>
        <select
          id="product"
          value={selectedProduct ? selectedProduct.id : ''}
          onChange={(e) => {
            const product = products.find((p) => p.id === parseInt(e.target.value, 10));
            setSelectedProduct(product);
            setSelectedColor('');
            setQuantity(1);
          }}
        >
          <option value="">Selecione um produto</option>
          {products
            .filter((product) => product.acceptsOrder)
            .map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="color-selection">
          <label htmlFor="color">Escolha a Cor</label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">Selecione uma cor</option>
            {selectedProduct.availableColors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="quantity-selection">
        <label htmlFor="quantity">Quantidade</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Enviar Encomenda via WhatsApp
      </button>
    </div>
  );
};

export default OrderPage;
