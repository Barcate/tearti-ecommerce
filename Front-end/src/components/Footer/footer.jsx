import React from 'react';
import './footer.css'; // Adicione o CSS correspondente para o footer

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Seção de Descrição da Empresa */}
                <div className="footer-about">
                    <h3>Sobre a TEARTI</h3>
                    <p>
                        A TEARTI é uma empresa especializada em produtos artesanais de alta qualidade, com foco em
                        oferecer experiências únicas para os nossos clientes. Criamos produtos com paixão, usando os
                        melhores materiais e técnicas.
                    </p>
                </div>

                {/* Seção de Links de Contato */}
                <div className="footer-contact">
                    <h3>Contato</h3>
                    <p><strong>WhatsApp:</strong> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">+55 11 99999-9999</a></p>
                    <p><strong>Instagram:</strong> <a href="https://www.instagram.com/tearti" target="_blank" rel="noopener noreferrer">@tearti</a></p>
                    <p><strong>E-mail:</strong> <a href="mailto:contato@tearti.com">contato@tearti.com</a></p>
                </div>

                {/* Seção de Links de Navegação */}
                <div className="footer-links">
                    <h3>Links Rápidos</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/produtos">Produtos</a></li>
                        <li><a href="/encomendas">Encomendar</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 TEARTI. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
