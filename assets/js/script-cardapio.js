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
            <div class="item-div" data-product='${JSON.stringify(produto)}'>
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

    // Adiciona evento de clique para abrir o modal
    const productDivs = document.querySelectorAll(".item-div");
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalWhatsAppButton = document.getElementById("whatssapp-button");
    const whatsappLink = document.getElementById("whatsapp-link");

    productDivs.forEach((div) => {
      div.addEventListener("click", () => {
        const product = JSON.parse(div.getAttribute("data-product"));

        // Preenche o modal com os dados do produto
        modalImage.src = product.imagem;
        modalTitle.textContent = product.nome;
        modalDescription.textContent = product.descricao;
        modalPrice.textContent = `R$ ${product.preco.toFixed(2)}`;
        modalWhatsAppButton.innerHTML = `
        <img src="./assets/img/img-whatsapp.png" alt="WhatsApp" class="whatsapp-icon">
        Fale sobre o ${(product.nome.toLowerCase())} agora!
        `;

        

        // Configuração do link do WhatsApp
        const message = `Olá, gostaria de saber mais sobre o produto: ${product.nome} - ${product.descricao}.`;
        whatsappLink.href = `https://wa.me/SEU_NUMERO_AQUI?text=${encodeURIComponent(message)}`;

        modal.style.display = "block";
      });
    });

    // Fechar o modal caso clique no botão ou fora dele
    document.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}); 