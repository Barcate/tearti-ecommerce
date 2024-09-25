import React, { useState, useEffect } from 'react';
import './Carrinho.css'; // CSS específico para a página Carrinho
import { useNavigate } from 'react-router-dom';

const Carrinho = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Visitante');
  // Estado para os itens do carrinho (exemplo de dados)
  const [itensCarrinho, setItensCarrinho] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      fetch('http://localhost:5000/usuarios/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setName(data.nome);
          fetchCarrinho(token);
        } else {
          localStorage.clear();
          navigate('/login');
        }
      })
    }
  }, [navigate]);

  function fetchCarrinho(token) {
    fetch('http://localhost:5000/carrinho', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      } else {
        setItensCarrinho(data);
        console.log(data);
      }
    }).catch((error) => {
      alert(error.message)
    })
  }

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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }

  const handleRemoverItemCarrinho = (produtoId) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/carrinho/${produtoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        // Se o item foi removido com sucesso, atualize o estado
        setItensCarrinho(itensCarrinho.filter(item => item.id !== produtoId));
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="carrinho-container">
      <h1>Carrinho de Compras</h1>
      <div>
        Olá, {name}!
        <button onClick={handleLogout}>Sair</button>
      </div>
      {itensCarrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="itens-carrinho">
          {itensCarrinho.map(item => (
            <div key={item.id} className="item">
              <img src={item.base64} alt={item.nome} className="item-imagem" />
              <div className="item-detalhes">
                <span className="item-nome">{item.nome}</span>
                <span className="item-preco">R${item.preco.toFixed(2)}</span>
                <span className="item-quantidade">Quantidade: {item.quantidade}</span>
              </div>
              <button className="remove-item" onClick={() => handleRemoverItemCarrinho(item.id)}>🗑️</button>
            </div>
          ))}
          <div className="total-container">
            <h2>Total: R${calcularTotal()}</h2>
            <button className="whatsapp-button" onClick={gerarMensagemWhatsApp}>Finalizar compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
