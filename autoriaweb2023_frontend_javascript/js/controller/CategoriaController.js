import CategoriaView from "../view/CategoriaView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de Categoria.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */ 
function renderizarCategoriaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = CategoriaView.renderizarFormularioCategoria();
  document.getElementById("formulario_Categoria").addEventListener("submit", cadastrarCategoria);
}

/**
 * Cadastra uma nova Categoria.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarCategoria(event) {
  event.preventDefault();
  const CategoriaValor = document.getElementById("Categoria_Nome_Categoria_formulario").value;
  const novaCategoria = { Nome_Categoria: CategoriaValor};
 
  try {
    await fetch(`${API_BASE_URL}/categoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaCategoria),
    }); 
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaCategoria(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Categoria:", error);
  }
}
/**
 * Renderiza a lista de categoria.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaCategoria(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/categoria");
    const categoriaBD = await response.json(); 

    const categoria = categoriaBD.map((row) => {
      return {
        id: row.IdCategoria,
        Nome_Categoria: row.Nome_Categoria,
      };
    });
    componentePrincipal.innerHTML = CategoriaView.renderizarTabelaCategoria(categoria);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de Categoria.
 * Cada botão, quando clicado, aciona a função de exclusão de Categoria correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const CategoriaId = this.getAttribute("categoria-id");
      excluirCategoria(CategoriaId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de Categoria.
 * Cada botão, quando clicado, aciona a função de buscar a Categoria específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const CategoriaId = this.getAttribute("categoria-atualizar-id");
      buscarCategoria(CategoriaId);
    });
  });
}

/**
 * Exclui uma Categoria específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de categoria é atualizada.
 * @param {string} id - ID da Categoria a ser excluída.
 */
async function excluirCategoria(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categoria/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a Categoria");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaCategoria(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Categoria:", error);
  }
}

/**
 * Busca uma Categoria específica para atualização, com base no ID.
 * Após encontrar a Categoria, renderiza o formulário de atualização.
 * @param {string} id - ID da Categoria a ser buscada.
 */
async function buscarCategoria(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categoria/${id}`);
    const categoriaBD = await response.json();
    if (categoriaBD.length <= 0) return;

    const Categoria = categoriaBD.map(row => ({
      id: row.IdCategoria,
      Nome_Categoria: row.Nome_Categoria,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = CategoriaView.renderizarFormularioCategoriaAtualizar(Categoria);
    document.getElementById("formulario_Categoria_atualizar").addEventListener("submit", atualizarCategoria);
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
  }
}

/**
 * Atualiza uma Categoria específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarCategoria(event) {
  event.preventDefault();

  const idValor = document.getElementById("Categoria_id_formulario").value;
  const CategoriaValor = document.getElementById("Categoria_Nome_Categoria_formulario").value;
  const Categoria = {id: idValor, Nome_Categoria: CategoriaValor};

  try {
    const response = await fetch(`${API_BASE_URL}/categoria`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Categoria),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a Categoria");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaCategoria(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Categoria:", error);
  }
}

const CategoriaController = {
  renderizarCategoriaFormulario,
  cadastrarCategoria,
  renderizarListaCategoria,
  excluirCategoria,
};

export default CategoriaController;