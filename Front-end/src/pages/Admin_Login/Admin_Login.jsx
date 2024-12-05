import React, { useState, useEffect } from 'react';
import './Admin_Login.css'; // CSS específico para a página de Login
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null); // Estado para armazenar erros
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/usuarios/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        if (data.admin) {
          navigate('/adm')
        }
      }
    })
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpar o erro antes de tentar o login

    if (!email.trim() || !senha) return;

    // Fazendo a requisição para a API de login
    try {
      const response = await fetch('http://localhost:5000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no login');
      }

      // Verificar se o usuário é administrador
      if (data.admin != 1) {
        throw new Error('Acesso negado. Apenas administradores podem acessar esta área.');
      }

      // Armazenar o token no localStorage
      localStorage.setItem('token', data.token);

      // Redirecionar para o painel de administrador
      navigate('/adm');
    } catch (error) {
      setError(error.message); // Definir mensagem de erro
    }
  };

  return (
    <div className="login-container">
      <h1>Login Administrador</h1>
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
        {error && <div className="error-message">{error}</div>} {/* Exibir erro, se houver */}
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
