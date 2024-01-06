/**
 * Renderiza o formulário para criar uma nova Plataforma.
 * @return {string} HTML do formulário de criação de Plataforma.
 */ 

function renderizarFormularioPlataforma() {
    return `
            <form class="mt-3" id="formulario_Plataforma">
                <div class="form-group">
                    <label for="Plataforma_Nome_Plataforma">Título da Plataforma:</label>
                    <input type="text" class="form-control" id="Plataforma_Nome_Plataforma_formulario"> 
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma Plataforma existente.
   * @param {Object} Plataforma - A Plataforma a ser atualizado.
   * @return {string} HTML do formulário de atualização de Plataforma.
   */
  function renderizarFormularioPlataformaAtualizar(Plataforma) {
      return `
              <form class="mt-3" id="formulario_Plataforma_atualizar">
                  <input type="hidden" class="form-control" id="Plataforma_id_formulario" value="${Plataforma.id}">
                  <div class="form-group">
                      <label for="Plataforma_Nome_Plataforma">Título do Plataforma:</label>
                      <input type="text" class="form-control" id="Plataforma_Nome_Plataforma_formulario" value="${Plataforma.Nome_Plataforma}">
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de Plataforma.
   * @param {Array} Plataforma - Lista de Plataforma a serem exibidos.
   * @return {string} HTML do tabela de Plataforma.
   */
  function renderizarTabelaPlataforma(Plataformas) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Título da Plataforma</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    Plataformas.forEach((plataforma) => {
      tabela += `
                <tr>
                    <td>${plataforma.Nome_Plataforma}</td>
                    <td>
                      <button class="excluir-btn" plataforma-id=${plataforma.id}>Excluir</button>
                      <button class="atualizar-btn" plataforma-atualizar-id=${plataforma.id}>Atualizar</button>
                    </td>
                </tr>
            `;
    });
  
    tabela += `
                </tbody>
            </table>
        `;
  
    return tabela;
  }
  
  const PlataformaView = {
      renderizarFormularioPlataforma,
      renderizarTabelaPlataforma,
      renderizarFormularioPlataformaAtualizar
  };
  
  export default PlataformaView;
  