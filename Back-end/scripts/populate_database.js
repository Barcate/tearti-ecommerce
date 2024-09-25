const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Function to read files and convert to Base64
const convertImageToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      const base64Image = data.toString('base64');
      resolve(`data:image/png;base64,${base64Image}`);
    });
  });
};

// Main function to handle the database operations
async function main() {
  const imageDir = './scripts/images';
  let files;
  
  // Read all image files
  try {
    files = await fs.promises.readdir(imageDir);
    files = files.sort((a, b) => {
      let tmpA = parseInt(a.split('.')[0]);
      let tmpB = parseInt(b.split('.')[0]);

      if (tmpA > tmpB) {
        return 1;
      } else if (tmpB > tmpA) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(files)
  } catch (error) {
    return console.error('Error reading directory:', error);
  }

  // Convert all images to Base64
  const imageList = await Promise.all(
    files.map(file => convertImageToBase64(path.join(imageDir, file)))
  );

  // Open the database
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
      { nome: 'Xale de Lã', descricao: 'Xale quente e confortável feito de lã.', preco: 55.00, estoque: 6, disponivel: 1 }
    ];

    // Insert products into the Produto table
    const stmtProduto = db.prepare(`INSERT INTO Produto (nome, descricao, preco, estoque, disponivel) VALUES (?, ?, ?, ?, ?)`);
    produtos.forEach(produto => {
      stmtProduto.run(produto.nome, produto.descricao, produto.preco, produto.estoque, produto.disponivel);
    });
    stmtProduto.finalize();

    // Insert images into the Thumbnail table
    const stmtThumbnail = db.prepare(`INSERT INTO Thumbnail (base64, produtoId) VALUES (?, ?)`);
    imageList.forEach((imgSrc, index) => {
      stmtThumbnail.run(imgSrc, index + 1); // Assuming ProdutoID is the index + 1
    });
    stmtThumbnail.finalize();

    console.log('Produtos e Thumbnails inseridos com sucesso!');
  });

  // Close the database
  db.close();
}

// Run the main function
main().catch(console.error);
