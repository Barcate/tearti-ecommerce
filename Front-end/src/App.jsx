import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Produto from './pages/Produto/Produto';
import Header from './components/Header/Header'; // Importa o Header
import './App.css'; // Importa o CSS para o componente App

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header alwaysWhite={false} /> {/* Cabeçalho não branco por padrão */}
              <Home />
            </>
          }
        />
        <Route
          path="/produto"
          element={
            <>
              <Header alwaysWhite={true} /> {/* Cabeçalho sempre branco */}
              <Produto />
            </>
          }
        />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default App;
