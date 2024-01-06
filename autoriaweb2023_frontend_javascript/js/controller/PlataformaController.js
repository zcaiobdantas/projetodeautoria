import PlataformaView from "../view/PlataformaView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de Plataforma.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */ 
function renderizarPlataformaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = PlataformaView.renderizarFormularioPlataforma();
  document.getElementById("formulario_Plataforma").addEventListener("submit", cadastrarPlataforma);
}

/**
 * Cadastra uma nova Plataforma.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarPlataforma(event) {
  event.preventDefault();
  const PlataformaValor = document.getElementById("Plataforma_Nome_Plataforma_formulario").value;
  const novaPlataforma = { Nome_Plataforma: PlataformaValor};
 
  try {
    await fetch(`${API_BASE_URL}/plataforma`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPlataforma),
    }); 
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaPlataforma(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Plataforma:", error);
  }
}
/**
 * Renderiza a lista de plataforma.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaPlataforma(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/plataforma");
    const plataformaBD = await response.json(); 

    const plataforma = plataformaBD.map((row) => {
      return {
        id: row.IdPlataforma,
        Nome_Plataforma: row.Nome_Plataforma,
      };
    });
    componentePrincipal.innerHTML = PlataformaView.renderizarTabelaPlataforma(plataforma);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar plataforma:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de Plataforma.
 * Cada botão, quando clicado, aciona a função de exclusão de Plataforma correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const PlataformaId = this.getAttribute("plataforma-id");
      excluirPlataforma(PlataformaId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de Plataforma.
 * Cada botão, quando clicado, aciona a função de buscar a Plataforma específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const PlataformaId = this.getAttribute("plataforma-atualizar-id");
      buscarPlataforma(PlataformaId);
    });
  });
}

/**
 * Exclui uma Plataforma específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de plataforma é atualizada.
 * @param {string} id - ID da Plataforma a ser excluída.
 */
async function excluirPlataforma(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/plataforma/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a Plataforma");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaPlataforma(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Plataforma:", error);
  }
}

/**
 * Busca uma Plataforma específica para atualização, com base no ID.
 * Após encontrar a Plataforma, renderiza o formulário de atualização.
 * @param {string} id - ID da Plataforma a ser buscada.
 */
async function buscarPlataforma(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/plataforma/${id}`);
    const plataformaBD = await response.json();
    if (plataformaBD.length <= 0) return;

    const Plataforma = plataformaBD.map(row => ({
      id: row.IdPlataforma,
      Nome_Plataforma: row.Nome_Plataforma,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = PlataformaView.renderizarFormularioPlataformaAtualizar(Plataforma);
    document.getElementById("formulario_Plataforma_atualizar").addEventListener("submit", atualizarPlataforma);
  } catch (error) {
    console.error("Erro ao buscar plataforma:", error);
  }
}

/**
 * Atualiza uma Plataforma específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarPlataforma(event) {
  event.preventDefault();

  const idValor = document.getElementById("Plataforma_id_formulario").value;
  const PlataformaValor = document.getElementById("Plataforma_Nome_Plataforma_formulario").value;
  const Plataforma = {id: idValor, Nome_Plataforma: PlataformaValor};

  try {
    const response = await fetch(`${API_BASE_URL}/plataforma`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Plataforma),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a Plataforma");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaPlataforma(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Plataforma:", error);
  }
}

const PlataformaController = {
  renderizarPlataformaFormulario,
  cadastrarPlataforma,
  renderizarListaPlataforma,
  excluirPlataforma,
};

export default PlataformaController;