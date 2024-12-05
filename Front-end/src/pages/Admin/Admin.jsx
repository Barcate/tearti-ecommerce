import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(''); // Estado para o preço
  const [imageFiles, setImageFiles] = useState([]);
  const [allowOrder, setAllowOrder] = useState(false);
  const [description, setDescription] = useState('');
  const [base64Array, setBase64Array] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (imageFiles.length) {
      if (imageFiles.length > 3) {
        alert('No máximo 3 fotos!');
        setImageFiles([]);
        setBase64Array([]);
      } else {
        const promises = Array.from(imageFiles).map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        });

        Promise.all(promises)
          .then((base64Images) => {
            setBase64Array(base64Images);
          })
          .catch(() => {
            alert('Erro ao carregar as imagens.');
          });
      }
    }
  }, [imageFiles]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/loginadm');
    } else {
      fetch('http://localhost:5000/usuarios/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          if (!data.admin) {
            localStorage.clear();
            navigate('/loginadm');
          }
        } else {
          localStorage.clear();
          navigate('/loginadm');
        }
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!productName || !base64Array.length) {
      alert('O nome do produto e a foto são obrigatórios.');
      return;
    }

    if (price <= 0) {
      alert('O preço deve ser maior que 0.');
      return;
    }

    const productData = {
      nome: productName,
      estoque: parseInt(quantity),
      preco: parseFloat(price),
      disponivel: allowOrder,
      descricao: description,
    };

    const response = await fetch('http://localhost:5000/produto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
    } else {
      alert('Produto enviado com sucesso!');
      const { id } = data;

      await fetch(`http://localhost:5000/thumbnails/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ thumbnails: base64Array })
      })
    }
  };

  return (
    <div className="admin-container">
      <h1>Administração de Produtos</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="productName">Nome do Produto</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Digite o nome do produto"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            cols="50"
            rows="3"
            placeholder="Descrição aqui..."
            onChange={(e) => setDescription(e.target.value)}
            required
            value={description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value > 0 ? e.target.value : 0)}
            placeholder="Digite a quantidade disponível"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Digite o preço do produto"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="allowOrder"
            checked={allowOrder}
            onChange={(e) => setAllowOrder(e.target.checked)}
          />
          <label htmlFor="allowOrder">Permitir pedidos fora de estoque</label>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Fotos do Produto</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => (e.target.files.length > 3 ? e.preventDefault() : setImageFiles(e.target.files))}
            multiple
            required
          />
          <div className="image-previews">
            {base64Array.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index + 1}`} width="50%" className="image-preview" />
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

export default Admin;
