<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos -Tearti</title>
    <link rel="icon" type="image/png" href="fotos/favicon.png" />
    <link rel="stylesheet" href="style.css"> 
    <link rel="stylesheet" href="CSS/header.css"> 
    
</head>
<body>
    
    <?php
    require_once(__DIR__ . "/model/Header.php");
    ?>
    <script>
            (function () {
                var menu = document.getElementById('header'); // colocar em cache
                window.addEventListener('scroll', function () {
                    if (window.scrollY >  735) menu.classList.add('mudaCor'); // > 0 ou outro valor desejado
                    else menu.classList.remove('mudaCor');
                });
            })();
    </script>
    <section class="ondas-box">
            <div class="titulo">
                <h1>TEARTI</h1>
                <div class="L2">PARA TI</div>
                <div class="barrinha"></div>
                <a id="a1" href="#anchor"><button class="Botao1">VER MAIS</button></a> 
                
                <!-- "id="anchor" usar para ir para um lugar da pagina"  -->
            </div>
            <div class="onda" id="onda1"></div>
            <div class="onda" id="onda2"></div>
            <div class="onda" id="onda3"></div>
            <div class="onda" id="onda4"></div>

            
    </section>
    <section class="conteudo">
        <div class="container">
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
            <div class="produto">
                <div class="imagem" style="background-image: url('./fotos/BACKGROUND-INICIAL.png');"></div>
                <div class="informacao">
                    <p class="nome">Produto genérico</p>
                    <p class="preco">R$10,00</p>
                </div>
            </div>
        </div>
    </section>
    <script>
        var onda1 = document.getElementById('onda1')
        var onda2 = document.getElementById('onda2')
        var onda3 = document.getElementById('onda3')
        var onda4 = document.getElementById('onda4')

        window.addEventListener('scroll', () => {
            var rolagemPos = window.scrollY 

            onda1.style.backgroundPositionX = 400 + rolagemPos * 4 + 'px';
            onda2.style.backgroundPositionX = 300 + rolagemPos * -4 + 'px';
            onda3.style.backgroundPositionX = 200 + rolagemPos * 2 + 'px';
            onda4.style.backgroundPositionX = 100 + rolagemPos * -2 + 'px';
        })
    </script>
</body>
</html>