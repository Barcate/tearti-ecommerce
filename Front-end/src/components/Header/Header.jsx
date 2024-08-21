import React, { useEffect } from 'react';
import './header.css';

const Header = () => {
    useEffect(() => {
        const handleScroll = () => {
            const menu = document.getElementById('header');
            if (window.scrollY > 735) {
                menu.classList.add('mudaCor');

            } else {
                menu.classList.remove('mudaCor');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header id="header">
            <div id="logo">
                <div id="item1">TEARTI</div>
                <div ><img id="item1-2"src='    '></img></div>
            </div>
            
            <div id="item2">
                <div id="item2-1"><a id="barrainferior" href="index.php">CARRINHO</a></div>
                <div id="item2-2"><a id="barrainferior" href="x">PRODUTOS</a></div>
                <div id="item2-3"><a id="barrainferior" href="x">CUSTOMIZAR</a></div>
                <div id="item2-4"><a id="barrainferior" href="x">CONTATO</a></div>
                <div id="item2-5"><a id="barrainferior" href="x">QUEM-SOMOS</a></div>
            </div>
        </header>
    );
};

export default Header;
