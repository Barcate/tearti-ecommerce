const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./bancodedados.db')

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
function getQueryall(query, params) {
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
    const result = await runQuery(`INSERT INTO Produto (NOME, DESCRICAO, PRECO, ESTOQUE, DISPONIVEL) VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao, preco, estoque, disponivel])
    console.log(`Produto criado com ID: ${result.lastID}`)
    return result.lastID
  } catch (err) {
    console.error(err.message)
  }
}

async function getProduto(id) {
  try {
    const row = await getQuery(`SELECT * FROM Produto WHERE ID = ?`, [id])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}
async function getallProduto() {
  try {
    const row = await getQueryall(`SELECT * FROM Produto`)
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function updateProduto(id, nome, descricao, preco, estoque, disponivel) {
  try {
    await runQuery(`UPDATE Produto SET NOME = ?, DESCRICAO = ?, PRECO = ?, ESTOQUE = ?, DISPONIVEL = ? WHERE ID = ?`,
      [nome, descricao, preco, estoque, disponivel, id])
    console.log(`Produto atualizado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function deleteProduto(id) {
  try {
    await runQuery(`DELETE FROM Produto WHERE ID = ?`, [id])
    console.log(`Produto deletado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function createThumbnail(base64, produtoID) {
  try {
    const result = await runQuery(`INSERT INTO Thumbnail (BASE64, ProdutoID) VALUES (?, ?)`,
      [base64, produtoID])
    console.log(`Thumbnail criado com ID: ${result.lastID}`)
    return result.lastID
  } catch (err) {
    console.error(err.message)
  }
}
async function getallThumbnail() {
  try {
    const row = await getQueryall(`SELECT * FROM Thumbnail`)
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}
async function getThumbnail(id) {
  try {
    const row = await getQuery(`SELECT * FROM Thumbnail WHERE ID = ?`, [id])
    console.log(row)
    return row
  } catch (err) {
    console.error(err.message)
  }
}

async function updateThumbnail(id, base64, produtoID) {
  try {
    await runQuery(`UPDATE Thumbnail SET BASE64 = ?, ProdutoID = ? WHERE ID = ?`,
      [base64, produtoID, id])
    console.log(`Thumbnail atualizado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

async function deleteThumbnail(id) {
  try {
    await runQuery(`DELETE FROM Thumbnail WHERE ID = ?`, [id])
    console.log(`Thumbnail deletado com ID: ${id}`)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = {
  createProduto,
  getProduto,
  getallProduto,
  updateProduto,
  deleteProduto,
  createThumbnail,
  getThumbnail,
  getallThumbnail,
  updateThumbnail,
  deleteThumbnail
}