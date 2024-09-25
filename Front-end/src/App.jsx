import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Produto from './pages/Produto/Produto';
import Header from './components/Header/Header'; // Importa o Header
import Carrinho from './pages/Carrinho/Carrinho'; // Importa o componente Carrinho
import Login from './pages/Login/Login'; // Importa o componente Carrinho
import Registro from './pages/Registro/Registro'; // Importa o componente Carrinho
import './App.css'; // Importa o CSS para o componente App

const App = () => {
  return (
    <Router>
      <Header alwaysWhite={false} /> {/* Cabeçalho não branco por padrão em todas as páginas */}
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        {/* Atualize a rota do produto para aceitar um ID */}
        <Route
          path="/produto/:id"
          element={<Produto />}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/registro"
          element={<Registro />}
        />
        {/* Rota do carrinho */}
        <Route
          path="/carrinho"
          element={<Carrinho />}
        />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default App;
