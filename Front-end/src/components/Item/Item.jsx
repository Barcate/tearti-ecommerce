import React, { useEffect } from 'react';
import './item.css';

const Item = (props) => {
    

    return (
        <div className="produto">
              <div className="imagem"><img src = {props.imagem} /></div>
              <div className="informacao">
                <p className="nome">{props.name}</p>
                <p className="key">{props.key}</p>
                <p className="preco">{props.price}</p>
                <p className="estoque">{props.estoque}</p>
                <p className="disponivel">{props.disponivel}</p>
              </div>
        </div>
    );
};

export default Item;
