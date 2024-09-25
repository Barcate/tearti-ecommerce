const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./bancodedados.db')

db.serialize(() => {
  db.run(`CREATE TABLE Usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
  )`)

  db.run(`CREATE TABLE Produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    preco REAL NOT NULL,
    estoque INTEGER NOT NULL,
    disponivel INTEGER NOT NULL
  )`)

  db.run(`CREATE TABLE Thumbnail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base64 TEXT NOT NULL,
    produtoId INTEGER NOT NULL,
    FOREIGN KEY(produtoId) REFERENCES Produto(id)
  )`)

  db.run(`CREATE TABLE Review (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    avaliacao INTEGER NOT NULL,
    usuarioId INTEGER NOT NULL,
    produtoId INTEGER NOT NULL,
    FOREIGN KEY(usuarioId) REFERENCES Usuario(id),
    FOREIGN KEY(produtoId) REFERENCES Produto(id)
  )`)

  db.run(`CREATE TABLE ItemCarrinho (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quantidade INTEGER NOT NULL,
    preco REAL NOT NULL,
    produtoId INTEGER,
    usuarioId INTEGER,
    FOREIGN KEY(produtoId) REFERENCES Produto(id),
    FOREIGN KEY(usuarioId) REFERENCES Usuario(id)
  )`)

  console.log('Tabelas criadas com sucesso!')
})