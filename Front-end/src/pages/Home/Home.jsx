import React, { useEffect, useState } from 'react';
import './Home.css'; // Importa o CSS específico para a página Home
import Item from '../../components/Item/Item';
const Home = () => {
  const [produto, setProdutos] = useState([]);
  const [thumbnail, setThumbnails] = useState({});

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
              const thumbResponse = await fetch(`http://localhost:5000/thumbnails/${produto.ID}`);
              if (!thumbResponse.ok) {
                throw new Error(`Failed to fetch thumbnail for product ${produto.ID}`);
              }
              const thumbData = await thumbResponse.json();
              console.log(`Thumbnail for ${produto.ID}:`, thumbData);
              return { id: produto.ID, thumbnail: thumbData.BASE64 || 'No thumbnail text' };
            } catch (error) {
              console.error(`Error fetching thumbnail for product ${produto.ID}:`, error);
              return { id: produto.ID, thumbnail: 'Error fetching thumbnail' };
            }
          })
        );

        console.log("Thumbnails Data Array:", thumbnailsData);

        const thumbnailsObject = thumbnailsData.reduce((acc, { id, thumbnail }) => {
          acc[id] = thumbnail;
          return acc;
        }, {});

        console.log("Thumbnails Object:", thumbnailsObject);
        setThumbnails(thumbnailsObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="ondas-box">
        <div className="titulo">
          <h1>TEARTI</h1>
          <div className="L2">FEITO PARA VOCÊ</div>
          <div className="barrinha"></div>
          <a id="a1" href="#anchor">
            <button className="Botao1">VER MAIS</button>
          </a>
        </div>
        <div className="onda" id="onda1"></div>
        <div className="onda" id="onda2"></div>
        <div className="onda" id="onda3"></div>
        <div className="onda" id="onda4"></div>
      </section>
      <section className="conteudo">
        <div className="container">
          {produto.map(produto => (
            <Item
              key={produto.ID}
              itemKey={produto.ID}
              name={produto.NOME}
              price={produto.PRECO}
              estoque={produto.ESTOQUE}
              disponivel={produto.DISPONIVEL}
              imagem={thumbnail[produto.ID] || 'Thumbnail not available'}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
