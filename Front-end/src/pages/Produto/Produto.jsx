import React from 'react';
import './Produto.css';

const Produto = () => {
  // Dados fixos do produto
  const produto = {
    id: 1,
    nome: "Porta Copos Liso Branco",
    preco: 11,
    precoAntigo: 16,
    desconto: 30,
    estoque: 4,
    descricao: "Porta Copos com fio de malha branco produzido artesanalmente em tear.",
    especificacoes: "Material: Fio de Malha Ecológico Trapillo da Círculo 94% poliéster e 6% elastano. Medidas aproximadas: 10,5 x 10,5 cm. Lavável e reutilizável.",
    imagens: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ]
  };

  return (
    <div className="produto-container">
      <div className="produto-imagens">
        {produto.imagens.map((imagem, index) => (
          <img
            key={index}
            src={imagem}
            alt={`Imagem ${index + 1}`}
            className="produto-imagem-miniatura"
          />
        ))}
      </div>
      <div className="produto-detalhes">
        <h2 className="produto-titulo">{produto.nome}</h2>
        <div className="produto-preco">
          <span>R$ {produto.preco}</span>
          <span className="produto-preco-antigo">R$ {produto.precoAntigo}</span>
          <span className="produto-desconto">-{produto.desconto}%</span>
        </div>
        <p className="produto-disponibilidade">
          Disponíveis: {produto.estoque} unidades
        </p>
        <p className="produto-descricao">{produto.descricao}</p>
        <div className="produto-especificacoes">
          <strong>Especificações do Produto:</strong>
          <p>{produto.especificacoes}</p>
        </div>
        <button className="produto-botao-comprar">Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default App;
