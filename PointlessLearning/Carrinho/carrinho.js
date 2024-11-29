// Função para exibir os itens do carrinho
function exibirCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const carrinhoContainer = document.querySelector('.itens-carrinho');
  carrinhoContainer.innerHTML = '';  // Limpar o carrinho antes de exibir os itens

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    document.getElementById('subtotal').innerText = 'R$0,00';
    return;
  }

  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="detalhes-item">
        <h4>${item.nome}</h4>
        <p>Preço: R$${item.preco.toFixed(2)}</p>
        <button class="remover" onclick="removerItem(${item.id})">Remover</button>
      </div>
    `;
    carrinhoContainer.appendChild(itemDiv);
  });

  atualizarSubtotal();
}

// Função para remover um item do carrinho
function removerItem(id) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinho.filter(item => item.id !== id); // Remove o item do carrinho
  localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o carrinho no localStorage
  exibirCarrinho(); // Re-renderiza o carrinho atualizado
}

// Função para atualizar o subtotal no carrinho
function atualizarSubtotal() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let subtotal = carrinho.reduce((acc, item) => acc + item.preco, 0); // Calcula o subtotal sem quantidade
  document.getElementById('subtotal').innerText = `R$${subtotal.toFixed(2)}`; // Exibe o subtotal
}

// Carregar o carrinho ao abrir a página
window.onload = function() {
  exibirCarrinho();
};

// Função para trocar o tema (modo claro e escuro)
const btnContraste = document.getElementById("btnContraste");

btnContraste.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "light");
    btnContraste.textContent = "🌙"; // Modo claro
  } else {
    document.body.setAttribute("data-theme", "dark");
    btnContraste.textContent = "☀️"; // Modo escuro
  }
});

// Função para trocar o idioma
const btnIdioma = document.getElementById("btnIdioma");

btnIdioma.addEventListener("click", () => {
  const currentLang = btnIdioma.textContent === "EN" ? "PT" : "EN";
  btnIdioma.textContent = currentLang;
  alterarIdioma(currentLang.toLowerCase());
});

// Função para alterar o idioma
function alterarIdioma(lang) {
  const textos = {
    pt: {
      carrinho: "Carrinho",
      remover: "Remover",
      subtotal: "Subtotal:",
    },
    en: {
      carrinho: "Cart",
      remover: "Remove",
      subtotal: "Subtotal:",
    },
  };

  document.querySelector("h2").textContent = textos[lang].carrinho;
  document.querySelectorAll(".remover").forEach((button) => {
    button.textContent = textos[lang].remover;
  });
  document.getElementById("subtotal").textContent = `${textos[lang].subtotal} R$0,00`;
}

