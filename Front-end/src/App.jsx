import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Produto from './pages/Produto/Produto';
import Header from './components/Header/Header'; // Importa o Header
import Carrinho from './pages/Carrinho/Carrinho'; // Importa o componente Carrinho
import Login from './pages/Login/Login'; // Importa o componente Carrinho
import Registro from './pages/Registro/Registro'; // Importa o componente Carrinho
import Admin_Login from './pages/Admin_Login/Admin_Login'; // Importa o componente adminlogin
import Admin from './pages/Admin/Admin'; // Importa o componente admin
import Comentarios from './pages/Review/Review'; // Importa o componente review
import Encomendas from './pages/OrderPage/OrderPage'; // Importa o componente encomenda
import Footer from './components/Footer/footer'; // Importa o Footer
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
        <Route
          path="/carrinho"
          element={<Carrinho />}
        />
        <Route
          path="/loginadm"
          element={<Admin_Login />}
        />
        <Route
          path="/adm"
          element={<Admin />}
        />
        <Route
          path="/produto/:id/comentarios"
          element={<Comentarios />}
        />
        <Route
          path="/encomendas"
          element={<Encomendas />}
        />
      </Routes>
      <Footer /> {/* Footer será renderizado em todas as páginas */}
    </Router>
  );
};

export default App;
