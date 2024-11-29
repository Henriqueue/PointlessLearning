// Função para expandir o ítem quando passar o mouse
document.querySelectorAll('.curso').forEach((curso) => {
    curso.addEventListener('mouseenter', () => {
      curso.style.transform = 'scale(1.1)';
      curso.style.zIndex = '10';
    });
    curso.addEventListener('mouseleave', () => {
      curso.style.transform = 'scale(1)';
      curso.style.zIndex = '1';
    });
  });
  
  function adicionarAoCarrinho(idCurso) {
    alert(`Curso ${idCurso + 1} adicionado ao carrinho!`);
    // Aqui você pode implementar a lógica para salvar no localStorage ou enviar para o backend.
  }
  
  // Função para adicionar um curso ao carrinho
function adicionarAoCarrinho(cursoId, nome, preco, imagemUrl) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];  // Verifica se já existem itens no carrinho

  // Verifica se o curso já está no carrinho
  let cursoExistente = carrinho.find(item => item.id === cursoId);

  if (cursoExistente) {
    cursoExistente.quantidade++;  // Se o curso já existir, apenas incrementa a quantidade
  } else {
    // Se o curso não existir, adiciona ele com a quantidade 1 e a URL da imagem
    carrinho.push({ id: cursoId, nome: nome, preco: preco, imagem: imagemUrl, quantidade: 1 });
  }

  // Atualiza o carrinho no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Feedback visual (opcional)
  alert(`${nome} foi adicionado ao carrinho!`);

  // Opcional: Redirecionar o usuário para a página do carrinho
  window.location.href = '/Carrinho/carrinho.html'; // ou '/Carrinho/carrinho.html'
}

// Código para o botão "Adicionar ao Carrinho"
const botoesAdicionarCarrinho = document.querySelectorAll('.btn-add-carrinho');

botoesAdicionarCarrinho.forEach((botao, index) => {
  // Supondo que o índice do botão seja o índice do curso
  botao.addEventListener('click', () => {
    const curso = document.querySelectorAll('.curso')[index];
    const nomeCurso = curso.querySelector('h3').textContent;
    const precoCurso = parseFloat(curso.querySelector('.preco').textContent.replace('R$', '').trim());
    const imagemCurso = curso.querySelector('img').src;  // Pegando a URL da imagem

    // Adiciona o curso ao carrinho
    adicionarAoCarrinho(index + 1, nomeCurso, precoCurso, imagemCurso);
  });
});

// Função para alternar o tema (claro / escuro)
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

// Função para alternar o idioma (PT / EN)
const btnIdioma = document.getElementById("btnIdioma");

btnIdioma.addEventListener("click", () => {
  const currentLang = btnIdioma.textContent === "EN" ? "PT" : "EN";
  btnIdioma.textContent = currentLang;
  alterarIdioma(currentLang.toLowerCase());
});

// Função para alterar o idioma no site
function alterarIdioma(lang) {
  const textos = {
    pt: {
      inicio: "Início",
      todosCursos: "Todos os Cursos",
      carrinho: "Carrinho",
      meusCursos: "Meus Cursos",
      bemVindo: "Bem-vindo aos Cursos Inúteis",
      saibaMais: "Saiba Mais",
      adicionarCarrinho: "Adicionar ao Carrinho"
    },
    en: {
      inicio: "Home",
      todosCursos: "All Courses",
      carrinho: "Cart",
      meusCursos: "My Courses",
      bemVindo: "Welcome to Useless Courses",
      saibaMais: "Learn More",
      adicionarCarrinho: "Add to Cart"
    },
  };

  // Alterar texto para o idioma escolhido
  document.querySelector(".active").textContent = textos[lang].inicio;
  document.querySelector("[href='/Todos.Os.Cursos/todos.os.cursos.html']").textContent = textos[lang].todosCursos;
  document.querySelector("[href='/Carrinho/carrinho.html']").textContent = textos[lang].carrinho;
  document.querySelector("[href='#']:last-of-type").textContent = textos[lang].meusCursos;
  document.querySelector(".texto-destaque h1").textContent = textos[lang].bemVindo;
  
  // Alterar botões de cursos
  document.querySelectorAll(".curso button").forEach(button => {
    button.textContent = textos[lang].adicionarCarrinho;
  });

  // Alterar "Saiba Mais" links
  document.querySelectorAll(".curso a").forEach(link => {
    link.textContent = textos[lang].saibaMais;
  });
}

