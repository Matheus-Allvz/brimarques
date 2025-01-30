document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./assets/js/produtos.json");
    const data = await response.json();

    const container = document.querySelector(".accordion");

    // Percorre as categorias do JSON e cria as seções dinamicamente
    Object.keys(data).forEach((categoria, index) => {
      const sectionId = `section${index + 1}`;
      const produtos = data[categoria]; // Array de produtos na categoria

      // Mapeia os produtos dentro da categoria para gerar o HTML
      const produtosHTML = produtos
        .map((produto, i) => `
            <div class="item-div">
              <div class="item-img-container">
                <img src="${produto.imagem}" alt="${produto.nome}" class="item-img">
              </div>
              <div class="item-text-content">
                <h5 class="item-title">${produto.nome}</h5>
                <p class="item-value">R$ ${produto.preco.toFixed(2)}</p>
                <p class="item-desc">${produto.descricao}</p>
              </div>
            </div>
            ${i < produtos.length - 1 ? "<hr>" : ""} <!-- Adiciona <hr> apenas se não for o último -->
          `)
        .join("");

      // Cria o HTML de cada seção
      const sectionHTML = `
        <div class="accordion-item">
          <input type="radio" id="${sectionId}" name="accordion" />
          <label for="${sectionId}" class="accordion-header">
            <span class="accordion-title">${categoria}</span>
            <div class="accordion-icon">
              <svg viewBox="0 0 16 16" fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" fill="currentColor"></path>
              </svg>
            </div>
          </label>
          <div class="content">
            ${produtosHTML}
          </div>
        </div>
      `;

      // Adiciona a nova seção ao container
      container.innerHTML += sectionHTML;
    });

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
});
