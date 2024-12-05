import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Produto.css'; // CSS específico para a página do Produto

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [quantidade, setQuantidade] = useState(1); // Estado para a quantidade
  const [avaliacao, setAvaliacao] = useState(0); // Estado para a avaliação do produto
  const [comentarios, setComentarios] = useState([]); // Estado para os comentários
  const [corSelecionada, setCorSelecionada] = useState(''); // Estado para a cor selecionada
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/produtos/${id}`);
        const data = await response.json();
        setProduto(data);

        const thumbResponse = await fetch(`http://localhost:5000/thumbnails/${id}`);
        const thumbData = await thumbResponse.json();
        setThumbnail(thumbData.base64);

        // Buscar as avaliações e comentários
        const comentariosResponse = await fetch(`http://localhost:5000/reviews/${id}`);
        const comentariosData = await comentariosResponse.json();
        // setComentarios(comentariosData.reviews);

        // Calcular a média das estrelas
        console.log(comentariosData.reviews)
        const mediaEstrelas = comentariosData.reviews.reduce((acc, comentario) => acc + comentario.avaliacao, 0) / comentariosData.reviews.length;
        // console.log(mediaEstrelas)
        setAvaliacao(mediaEstrelas || 0);

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduto();
  }, [id]);

  // Função para aumentar a quantidade
  const aumentarQuantidade = () => {
    if (quantidade < produto.estoque) {
      setQuantidade(quantidade + 1);
    }
  };

  // Função para diminuir a quantidade
  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = () => {
    // Aqui você pode adicionar a lógica para adicionar o produto ao carrinho
    console.log(`Adicionando ${quantidade} de ${produto.nome} ao carrinho. Cor: ${corSelecionada}`);

    const token = localStorage.getItem('token');
    let isValid = true;

    if (!token) {
      navigate('/login');
      isValid = false;
    } else {
      fetch('http://localhost:5000/usuarios/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(async (response) => {
        if (!response.ok) {
          localStorage.clear();
          isValid = false;
          navigate('/login');
        }
      })
    }
    
    if (!isValid) return;
    fetch(`http://localhost:5000/carrinho`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        quantidade,
        produtoId: id,
        cor: corSelecionada
      })
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      } else {
        alert('Item adicionado com sucesso!');
        navigate('/');
      }
    }).catch((error) => {
      alert(error.message);
    });
  };

  // Função para lidar com a mudança de cor
  const selecionarCor = (cor) => {
    setCorSelecionada(cor);
  };

  if (!produto) {
    return <div>Loading...</div>;
  }

  return (
    <div className="produto-container">
      <div className="produto-detalhes">
        <div className="produto-foto">
          <img src={thumbnail} alt={produto.nome} />
        </div>
        <div className="produto-informacoes">
          <h1>{produto.nome}</h1>
          <div className="preco">
            R${produto.preco.toFixed(2)}
          </div>
          <p>{produto.descricao}</p>
          <p>Estoque: {produto.estoque}</p>
          <p>{produto.disponivel ? 'Disponível' : 'Indisponível'}</p>

          {/* Seleção de cor */}
          {produto.cores && produto.cores.length > 0 && (
            <div className="selecao-cor">
              <h3>Selecione a Cor</h3>
              <div className="cores">
                {produto.cores.map((cor) => (
                  <button
                    key={cor}
                    className={`cor ${cor === corSelecionada ? 'selecionada' : ''}`}
                    style={{ backgroundColor: cor }}
                    onClick={() => selecionarCor(cor)}
                  >
                    {cor === corSelecionada ? '✓' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Controles de quantidade */}
          <div className="controle-quantidade">
            <button onClick={diminuirQuantidade} disabled={quantidade <= 1}>-</button>
            <span>{quantidade}</span>
            <button onClick={aumentarQuantidade} disabled={quantidade >= produto.estoque}>+</button>
          </div>

          <button className="adicionar-carrinho" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
        </div>
      </div>

      {/* Seção de Avaliações e Comentários */}
      <div className="avaliacoes-comentarios">
        <div className="avaliacao">
          <h3>Avaliação do Produto</h3>
          <div className="estrelas">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <span key={estrela} className={`estrela ${avaliacao >= estrela ? 'cheia' : ''}`}>★</span>
            ))}
          </div>
          <p>Média de Avaliação: {avaliacao.toFixed(1)} estrelas</p>
        </div>

        <div className="comentarios-link">
          <button onClick={() => navigate(`/produto/${id}/comentarios`)}>Ver Comentários</button>
        </div>
      </div>
    </div>
  );
};

export default Produto;
