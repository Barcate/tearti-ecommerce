import React, { useState } from 'react';
import './Carrinho.css'; // CSS específico para a página Carrinho

const Carrinho = () => {
  // Estado para os itens do carrinho (exemplo de dados)
  const [itensCarrinho, setItensCarrinho] = useState([
    { id: 1, nome: 'Cachecol de Lã', preco: 49.99, quantidade: 2, imagem: 'url_da_imagem_1' },
    { id: 2, nome: 'Camiseta Básica', preco: 29.99, quantidade: 1, imagem: 'url_da_imagem_2' },
    // Adicione mais itens conforme necessário
  ]);

  // Função para gerar mensagem para WhatsApp
  const gerarMensagemWhatsApp = () => {
    const mensagem = itensCarrinho.map(item => {
      return `*${item.nome}*\nPreço: R$${item.preco.toFixed(2)}\nQuantidade: ${item.quantidade}\n`;
    }).join('\n');

    const urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank'); // Abre o WhatsApp em uma nova aba
  };

  const calcularTotal = () => {
    return itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0).toFixed(2);
  };

  return (
    <div className="carrinho-container">
      <h1>Carrinho de Compras</h1>
      {itensCarrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="itens-carrinho">
          {itensCarrinho.map(item => (
            <div key={item.id} className="item">
              <img src={item.imagem} alt={item.nome} className="item-imagem" />
              <div className="item-detalhes">
                <span className="item-nome">{item.nome}</span>
                <span className="item-preco">R${item.preco.toFixed(2)}</span>
                <span className="item-quantidade">Quantidade: {item.quantidade}</span>
              </div>
              <button className="remove-item" onClick={() => {/* Lógica para remover item */}}>🗑️</button>
            </div>
          ))}
          <div className="total-container">
            <h2>Total: R${calcularTotal()}</h2>
            <button className="whatsapp-button" onClick={gerarMensagemWhatsApp}>Finalizar no WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
