const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bancodedados.db');

db.serialize(() => {
  // Inserir 10 produtos
  const produtos = [
    { nome: 'Cachecol de Lã', descricao: 'Cachecol feito à mão com lã de alta qualidade.', preco: 49.99, estoque: 10, disponivel: 1 },
    { nome: 'Tapete de Tear', descricao: 'Tapete artesanal feito em tear manual.', preco: 120.00, estoque: 5, disponivel: 1 },
    { nome: 'Manta de Algodão', descricao: 'Manta confortável e suave feita de algodão puro.', preco: 75.50, estoque: 8, disponivel: 1 },
    { nome: 'Bolsa de Tear', descricao: 'Bolsa estilosa feita com técnica de tear manual.', preco: 89.99, estoque: 7, disponivel: 1 },
    { nome: 'Capa de Almofada', descricao: 'Capa de almofada artesanal com designs únicos.', preco: 25.00, estoque: 15, disponivel: 1 },
    { nome: 'Toalha de Mesa', descricao: 'Toalha de mesa elegante feita em tear.', preco: 60.00, estoque: 12, disponivel: 1 },
    { nome: 'Caminho de Mesa', descricao: 'Caminho de mesa feito à mão com detalhes delicados.', preco: 45.00, estoque: 10, disponivel: 1 },
    { nome: 'Pano de Prato', descricao: 'Pano de prato artesanal com bordados.', preco: 15.00, estoque: 20, disponivel: 1 },
    { nome: 'Cortina de Tear', descricao: 'Cortina artesanal feita com tear manual.', preco: 150.00, estoque: 4, disponivel: 1 },
    { nome: 'Xale de Lã', descricao: 'Xale quente e confortável feito de lã.', preco: 55.00, estoque: 6, disponivel: 1 },
  ];

  const stmtProduto = db.prepare(`INSERT INTO Produto (NOME, DESCRICAO, PRECO, ESTOQUE, DISPONIVEL) VALUES (?, ?, ?, ?, ?)`);
  produtos.forEach(produto => {
    stmtProduto.run(produto.nome, produto.descricao, produto.preco, produto.estoque, produto.disponivel);
  });
  stmtProduto.finalize();

  // Inserir 10 thumbnails (usando base64 como exemplo de placeholder)
  const thumbnails = [
    'base64_image_1',
    'base64_image_2',
    'base64_image_3',
    'base64_image_4',
    'base64_image_5',
    'base64_image_6',
    'base64_image_7',
    'base64_image_8',
    'base64_image_9',
    'base64_image_10',
  ];

  const stmtThumbnail = db.prepare(`INSERT INTO Thumbnail (BASE64, ProdutoID) VALUES (?, ?)`);
  thumbnails.forEach((thumbnail, index) => {
    stmtThumbnail.run(thumbnail, index + 1); // Assumindo que ProdutoID é o índice + 1
  });
  stmtThumbnail.finalize();

  console.log('Produtos e Thumbnails inseridos com sucesso!');
});

db.close();