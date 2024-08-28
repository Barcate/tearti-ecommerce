import React, { useEffect } from 'react';
import './item.css';

const Item = (props) => {
    

    return (
        <div className="produto">
              <div className="imagem"><img src={props.imagem}/></div>
              <div className="informacao">
                <p className="nome">{props.name}</p>
                <p className="preco">R${props.price}</p>
              </div>
        </div>
    );
};

export default Item;
