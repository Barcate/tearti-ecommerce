import React, { useState } from 'react';
import './Registro.css'; // CSS específico para a página de Registro
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome.trim() || !email.trim() || !senha) return;

    fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo deu errado!');
      }

      return data;
    }).then((data) => {
      alert('A sua conta foi criada com sucesso!')
      navigate('/login');
    }).catch((error) => {
      setError(error.message);
    })
  };

  return (
    <div className="registro-container">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="nome">Nome</label>
          <input 
            type="text" 
            id="nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required
            autoComplete='off'
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            autoComplete='off'
          />
        </div>
        <div className="input-container">
          <label htmlFor="senha">Senha</label>
          <input 
            type="password" 
            id="senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required
            autoComplete='off'
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="register-button">Registrar</button>
      </form>
      <button className="back-to-login-button" onClick={() => navigate('/login')}>
        Voltar para Login
      </button>
    </div>
  );
};

export default Registro;
