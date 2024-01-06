/**
 * Renderiza o formulário para criar uma nova Categoria.
 * @return {string} HTML do formulário de criação de Categoria.
 */ 

function renderizarFormularioCategoria() {
    return `
            <form class="mt-3" id="formulario_Categoria">
                <div class="form-group">
                    <label for="Categoria_Nome_Categoria">Título da Categoria:</label>
                    <input type="text" class="form-control" id="Categoria_Nome_Categoria_formulario"> 
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma Categoria existente.
   * @param {Object} Categoria - A Categoria a ser atualizado.
   * @return {string} HTML do formulário de atualização de Categoria.
   */
  function renderizarFormularioCategoriaAtualizar(Categoria) {
      return `
              <form class="mt-3" id="formulario_Categoria_atualizar">
                  <input type="hidden" class="form-control" id="Categoria_id_formulario" value="${Categoria.id}">
                  <div class="form-group">
                      <label for="Categoria_Nome_Categoria">Título do Categoria:</label>
                      <input type="text" class="form-control" id="Categoria_Nome_Categoria_formulario" value="${Categoria.Nome_Categoria}">
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de Categoria.
   * @param {Array} Categoria - Lista de Categoria a serem exibidos.
   * @return {string} HTML do tabela de Categoria.
   */
  function renderizarTabelaCategoria(Categorias) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Título da Categoria</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    Categorias.forEach((categoria) => {
      tabela += `
                <tr>
                    <td>${categoria.Nome_Categoria}</td>
                    <td>
                      <button class="excluir-btn" categoria-id=${categoria.id}>Excluir</button>
                      <button class="atualizar-btn" categoria-atualizar-id=${categoria.id}>Atualizar</button>
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
  
  const CategoriaView = {
      renderizarFormularioCategoria,
      renderizarTabelaCategoria,
      renderizarFormularioCategoriaAtualizar
  };
  
  export default CategoriaView;
  