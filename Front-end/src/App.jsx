import React, { useEffect, useState } from 'react';
import './App.css';
import Item from './components/Item/Item';


const App = () => {
  const [produto, setProdutos] = useState([]);
  const [thumbnail, setThumbnails] = useState([]);
  //listar produtos


  useEffect(()=>{
    const fetchData = async() => {
      try{
        const response = await fetch(`http://localhost:5000/produtos`)
        const data = await response.json();
        setProdutos(data);
        console.log(setProdutos)

        // Fetch thumbnails for each product
        const thumbnailsData = await Promise.all(
          data.map(async (produto) => { 
            const thumbResponse = await fetch(`http://localhost:5000/thumbnails/${produto.ID}`);  
            const thumbData = await thumbResponse.json();
            console.log(thumbData)
            return { id: produto.id, thumbnail: thumbData.base64 };
          })
        );

        // Convert the array to an object with product id as keys
        const thumbnailsObject = thumbnailsData.reduce((acc, { id, thumbnail }) => {
          acc[id] = thumbnail;
          return acc;
        }, {});

        setThumbnails(thumbnailsObject);
      }catch(error){
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //Funcionamento das ondas oscilando
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      document.getElementById('onda1').style.backgroundPositionX = 400 + scrollPosition * 4 + 'px';
      document.getElementById('onda2').style.backgroundPositionX = 300 + scrollPosition * -4 + 'px';
      document.getElementById('onda3').style.backgroundPositionX = 200 + scrollPosition * 2 + 'px';
      document.getElementById('onda4').style.backgroundPositionX = 100 + scrollPosition * -2 + 'px';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div>
      <section className="ondas-box">
        <div className="titulo">
          <h1>TEARTI</h1>
          <div className="L2">PARA TI</div>
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
              name={produto.NOME}
              price={produto.PRECO}
              estoque={produto.ESTOQUE}
              disponivel={produto.DISPONIVEL}
              imagem={`${thumbnail[produto.ID]}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
