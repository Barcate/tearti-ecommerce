import React, { useState } from 'react';
import './Registro.css'; // CSS específico para a página de Registro
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para registro (substituir por sua lógica real)
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
    // Redirecionar ou mostrar mensagem de sucesso
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
          />
        </div>
        <button type="submit" className="register-button">Registrar</button>
      </form>
      <button className="back-to-login-button" onClick={() => navigate('/login')}>
        Voltar para Login
      </button>
    </div>
  );
};

export default Registro;
