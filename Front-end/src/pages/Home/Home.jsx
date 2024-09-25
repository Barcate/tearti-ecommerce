import React, { useEffect, useState, useRef } from 'react';
import './Home.css'; // Importa o CSS específico para a página Home
import Item from '../../components/Item/Item';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação

const Home = () => {
  const [produto, setProdutos] = useState([]);
  const [thumbnail, setThumbnails] = useState({});
  const navigate = useNavigate(); // Inicializa o hook para navegar entre páginas
  const myRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/produtos`);
        const data = await response.json();
        setProdutos(data);
        console.log("Produtos:", data);

        const thumbnailsData = await Promise.all(
          data.map(async (produto) => {
            try {
              const thumbResponse = await fetch(`http://localhost:5000/thumbnails/${produto.id}`);
              if (!thumbResponse.ok) {
                throw new Error(`Failed to fetch thumbnail for product ${produto.id}`);
              }
              const thumbData = await thumbResponse.json();
              // console.log(`Thumbnail for ${produto.id}:`, thumbData);
              return { id: produto.id, thumbnail: thumbData.base64 || 'No thumbnail text' };
            } catch (error) {
              console.error(`Error fetching thumbnail for product ${produto.id}:`, error);
              return { id: produto.id, thumbnail: 'Error fetching thumbnail' };
            }
          })
        );

        console.log("Thumbnails Data Array:", thumbnailsData);

        const thumbnailsObject = thumbnailsData.reduce((acc, { id, thumbnail }) => {
          acc[id] = thumbnail;
          return acc;
        }, {});

        // console.log("Thumbnails Object:", thumbnailsObject);
        setThumbnails(thumbnailsObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Função para capturar o clique e redirecionar para a página do produto
  const handleProductClick = (id) => {
    navigate(`/produto/${id}`); // Redireciona para a URL com o ID do produto
  };

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <section className="ondas-box">
        <div className="titulo">
          <h1>TEARTI</h1>
          <div className="L2">FEITO PARA VOCÊ</div>
          <div className="barrinha"></div>
          <button className="Botao1" onClick={() => handleScroll(myRef)}>VER MAIS</button>
        </div>
        <div className="onda" id="onda1"></div>
        <div className="onda" id="onda2"></div>
        <div className="onda" id="onda3"></div>
        <div className="onda" id="onda4"></div>
      </section>
      <section className="conteudo">
        <div className="container" ref={myRef}>
          {produto.map((produto) => (
            <div
              key={produto.id}
              onClick={() => handleProductClick(produto.id)} // Função que captura o clique no produto
              style={{ cursor: 'pointer' }} // Estilo para indicar que o item é clicável
            >
              <Item
                itemKey={produto.id}
                name={produto.nome}
                price={produto.preco}
                estoque={produto.estoque}
                disponivel={produto.disponivel}
                imagem={thumbnail[produto.id] || 'Thumbnail not available'}
              />
            </div>
          ))}
        </div>
        <div id="anchor"></div>
      </section>
    </div>
  );
};

export default Home;
