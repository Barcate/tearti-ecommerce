// Header.jsx

import React, { useState, useEffect } from 'react';
import './header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerColor, setHeaderColor] = useState('header');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
    
        if (scrollPosition > 750) {
          setHeaderColor('header_White');
        } else {
          setHeaderColor('header'); 
        }
      };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={headerColor}>
            <div id="logo">
                <img src="./images/logo.png" alt="Logo" />
                <span id="logo-text">TEARTI</span>
            </div>
            <div id="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav id="item2" className={menuOpen ? 'show' : ''}>
                <a href="#" id="item2-1">CARRINHO</a>
                <a href="#" id="item2-2">PRODUTOS</a>
                <a href="#" id="item2-3">CUSTOMIZAR</a>
                <a href="#" id="item2-4">CONTATO</a>
                <a href="#" id="item2-5">QUEM SOMOS</a>
            </nav>
        </header>
    );
}

export default Header;
