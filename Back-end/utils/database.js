const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./bancodedados.db')
const bcrypt = require('bcrypt')

function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        reject(err)
      } else {
        resolve(this)
      }
    })
  })
}

function getQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

function getQueryAll(query, params) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

async function createProduto(nome, descricao, preco, estoque, disponivel) {
  try {
    const result = await runQuery(`INSERT INTO Produto (nome, descricao, preco, estoque, disponivel) VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao, preco, estoque, disponivel])
    console.log(`Produto criado com ID: ${result.lastID}`)
    return result.lastID
  } catch (err) {
    console.error(err.message)
  }
}

async function getProduto(id) {
  try {
    const row = await getQuery(`SELECT * FROM Produto WHERE id = ?`, [id])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function getAllProduto() {
  try {
    const row = await getQueryAll(`SELECT * FROM Produto`)
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function updateProduto(id, nome, descricao, preco, estoque, disponivel) {
  try {
    await runQuery(`UPDATE Produto SET nome = ?, descricao = ?, preco = ?, estoque = ?, disponivel = ? WHERE id = ?`,
      [nome, descricao, preco, estoque, disponivel, id])
    console.log(`Produto atualizado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function deleteProduto(id) {
  try {
    await runQuery(`DELETE FROM Produto WHERE id = ?`, [id])
    console.log(`Produto deletado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function createThumbnail(base64, produtoID) {
  try {
    const result = await runQuery(`INSERT INTO Thumbnail (base64, produtoId) VALUES (?, ?)`,
      [base64, produtoID])
    console.log(`Thumbnail criado com ID: ${result.lastID}`)
    return result.lastID
  } catch (err) {
    console.error(err.message)
  }
}
async function getAllThumbnail() {
  try {
    const row = await getQueryAll(`SELECT * FROM Thumbnail`)
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}
async function getThumbnail(id) {
  try {
    const row = await getQuery(`SELECT * FROM Thumbnail WHERE id = ?`, [id])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function updateThumbnail(id, base64, produtoID) {
  try {
    await runQuery(`UPDATE Thumbnail SET base64 = ?, produtoId = ? WHERE id = ?`,
      [base64, produtoID, id])
    console.log(`Thumbnail atualizado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function deleteThumbnail(id) {
  try {
    await runQuery(`DELETE FROM Thumbnail WHERE id = ?`, [id])
    console.log(`Thumbnail deletado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function createUsuario(nome, email, senha, isAdmin = 0) {
  try {
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds); // Hash da senha
    const result = await runQuery(`INSERT INTO Usuario (nome, email, senha, admin) VALUES (?, ?, ?, ?)`,
      [nome, email, hashedSenha, isAdmin])
    console.log(`Usuário criado com ID: ${result.lastID}`)
    return result.lastID
  } catch (err) {
    console.error(err.message)
  }
}

async function getUsuario(id) {
  try {
    const row = await getQuery(`SELECT * FROM Usuario WHERE id = ?`, [id])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function getAllUsuarios() {
  try {
    const rows = await getQueryAll(`SELECT * FROM Usuario`)
    console.log(rows)
    return rows
  } catch (err) {
    console.error(err.message)
  }
}

async function updateUsuario(id, nome, email, senha) {
  try {
    await runQuery(`UPDATE Usuario SET nome = ?, email = ?, senha = ? WHERE id = ?`,
      [nome, email, senha, id])
    console.log(`Usuário atualizado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function deleteUsuario(id) {
  try {
    await runQuery(`DELETE FROM Usuario WHERE ID = ?`, [id])
    console.log(`Usuário deletado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function getUsuarioPorNome(nome) {
  try {
    const row = await getQuery(`SELECT * FROM Usuario WHERE nome = ?`, [nome])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function getUsuarioPorEmail(email) {
  try {
    const row = await getQuery(`SELECT * FROM Usuario WHERE email = ?`, [email])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function verificarLogin(email, senha) {
  try {
    const usuario = await getUsuarioPorEmail(email);
    if (!usuario) {
      return null;
    }

    const isSenhaValida = await bcrypt.compare(senha, usuario.senha);
    if (isSenhaValida) {
      return usuario;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function createItemCarrinho(quantidade, produtoId, usuarioId) {
  try {
    const result = await runQuery(
      `INSERT INTO ItemCarrinho (quantidade, produtoId, usuarioId) VALUES (?, ?, ?)`,
      [quantidade, produtoId, usuarioId]
    );
    console.log(`ItemCarrinho criado com ID: ${result.lastID}`);
    return result.lastID;
  } catch (err) {
    console.error(err.message);
  }
}

async function getItensCarrinho(usuarioId) {
  try {
    const rows = await getQueryAll(
      `SELECT c.id, c.quantidade, p.nome, p.descricao, p.preco, p.estoque, p.disponivel, t.base64 FROM ItemCarrinho c, Produto p, Thumbnail t WHERE c.usuarioId = ? AND p.id = c.produtoId AND t.produtoId = p.id`,
      [usuarioId]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err.message);
  }
}

async function updateItemCarrinho(id, quantidade, preco, produtoId) {
  try {
    await runQuery(
      `UPDATE ItemCarrinho SET quantidade = ?, produtoId = ? WHERE id = ?`,
      [quantidade, produtoId, id]
    );
    console.log(`ItemCarrinho atualizado com ID: ${id}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function deleteItemCarrinho(id) {
  try {
    await runQuery(`DELETE FROM ItemCarrinho WHERE id = ?`, [id]);
    console.log(`ItemCarrinho deletado com ID: ${id}`);
  } catch (err) {
    console.error(err.message);
  }
}

async function isItemCarrinhoDoUsuario(itemId, usuarioId) {
  try {
    console.log(itemId, usuarioId)
    const row = await getQuery(
      `SELECT * FROM ItemCarrinho WHERE id = ? AND usuarioId = ?`,
      [itemId, usuarioId]
    );
    return !!row; // Retorna verdadeiro se encontrar o item
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

async function createReview(texto, avaliacao, usuarioId, produtoId) {
  try {
    const result = await runQuery(
      `INSERT INTO Review (texto, avaliacao, usuarioId, produtoId) VALUES (?, ?, ?, ?)`,
      [texto, avaliacao, usuarioId, produtoId]
    );
    console.log(`Review criada com ID: ${result.lastID}`);
    return result.lastID;
  } catch (err) {
    console.error(err.message);
  }
}

async function getReviewsDoProduto(produtoId) {
  try {
    const rows = await getQueryAll(
      `SELECT r.*, u.nome FROM Review r, Produto p, Usuario u WHERE r.produtoId = p.id AND r.usuarioId = u.id AND p.id = ?`,
      [produtoId]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  createProduto,
  getProduto,
  getAllProduto,
  updateProduto,
  deleteProduto,
  createThumbnail,
  getThumbnail,
  getAllThumbnail,
  updateThumbnail,
  deleteThumbnail,
  createUsuario,
  getUsuario,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuarioPorEmail,
  getUsuarioPorNome,
  verificarLogin,
  createItemCarrinho,
  getItensCarrinho,
  updateItemCarrinho,
  deleteItemCarrinho,
  isItemCarrinhoDoUsuario,
  createReview,
  getReviewsDoProduto
}