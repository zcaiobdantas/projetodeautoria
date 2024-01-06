const express = require('express');
const router = express.Router();
const db = require('../util/db');

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
  executarConsultaAtor('SELECT * FROM plataformas', [], res, "Erro na consulta de plataformas");
});

// Rota para buscar uma plataforma específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsultaAtor('SELECT * FROM plataformas WHERE IdPlataforma = ?', [id], res, "Erro na consulta de plataforma");
});

// Rota para criar uma nova plataforma
router.post('/', (req, res) => {
  const {Nome_Plataforma} = req.body;
  executarConsultaAtor('INSERT INTO plataformas (Nome_Plataforma) VALUES (?)', [Nome_Plataforma], res, "Erro no cadastro de plataforma!");
});

// Rota para deletar uma plataforma
router.delete("/:id", (req, res) => {
  const plataformaId = req.params.id;
  executarConsultaAtor('DELETE FROM plataformas WHERE IdPlataforma = ?', [plataformaId], res, 'Erro ao deletar plataforma');
});

// Rota para atualizar uma plataforma
router.put('/', (req, res) => {
  const { id, Nome_Plataforma} = req.body;
  executarConsultaAtor('UPDATE plataformas SET Nome_Plataforma = ? WHERE IdPlataforma = ?', [Nome_Plataforma, id], res, "Erro ao atualizar plataforma");
});

module.exports = router;