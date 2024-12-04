import React, { useState, useEffect } from 'react';
import './header.css';

function Header({ alwaysWhite }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerColor, setHeaderColor] = useState('header');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 750 && !alwaysWhite) {
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
    }, [alwaysWhite]);

    // Apply alwaysWhite class if prop is true
    const headerClass = alwaysWhite ? 'header_White' : headerColor;

    return (
        <header className={headerClass}>
            <div id="logo">
                <img src="/images/logo.png" alt="Logo" />
                <a href="/" id="logo-text">TEARTI</a>
            </div>
            <div id="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav id="item2" className={menuOpen ? 'show' : ''}>
                <a href="/carrinho" id="item2-1">CARRINHO</a>
                <a href="/" id="item2-2">PRODUTOS</a>
                <a href="/encomendas" id="item2-3">ENCOMENDAR</a>
            </nav>
        </header>
    );
}

export default Header;
