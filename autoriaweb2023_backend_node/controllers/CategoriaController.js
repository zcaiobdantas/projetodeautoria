const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsultaAtor(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as gêneros       
router.get('/', (req, res) => {
  executarConsultaAtor('SELECT * FROM categoria', [], res, "Erro na consulta de categorias");
});

// Rota para buscar uma categoria específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsultaAtor('SELECT * FROM categoria WHERE IdCategoria = ?', [id], res, "Erro na consulta de categoria");
});

// Rota para criar uma nova categoria
router.post('/', (req, res) => {
  const {Nome_Categoria} = req.body;
  executarConsultaAtor('INSERT INTO categoria (Nome_Categoria) VALUES (?)', [Nome_Categoria], res, "Erro no cadastro de categoria!");
});

// Rota para deletar uma categoria
router.delete("/:id", (req, res) => {
  const categoriaId = req.params.id;
  executarConsultaAtor('DELETE FROM categoria WHERE IdCategoria = ?', [categoriaId], res, 'Erro ao deletar categoria');
});

// Rota para atualizar uma categoria
router.put('/', (req, res) => {
  const { id, Nome_Categoria} = req.body;
  executarConsultaAtor('UPDATE categoria SET Nome_Categoria = ?  WHERE IdCategoria = ?', [Nome_Categoria, id], res, "Erro ao atualizar categoria");
});

module.exports = router;