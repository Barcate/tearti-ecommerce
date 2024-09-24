import React, { useState } from 'react';
import './Login.css'; // CSS específico para a página de Login
import { useNavigate } from 'react-router-dom'; // Substituindo useHistory por useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para autenticação (substituir por sua lógica real)
    console.log('Email:', email);
    console.log('Senha:', senha);
    // Redirecionar ou mostrar mensagem de sucesso
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="login-button" onClick={() => navigate('/home')}>Entrar</button>
      </form>
      <button className="register-button" onClick={() => navigate('/registro')}>
        Criar Conta
      </button>
    </div>
  );
};

export default Login;
