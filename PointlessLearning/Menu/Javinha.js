const cursos = document.querySelectorAll('.carrossel-content .curso');
const btnPrev = document.querySelector('.btn-nav.prev');
const btnNext = document.querySelector('.btn-nav.next');
let currentStartIndex = 0; // Índice inicial dos cursos visíveis

function atualizarCursos() {
  cursos.forEach((curso, index) => {
    curso.classList.remove('visivel'); // Remove a classe 'visivel' de todos
    if (index >= currentStartIndex && index < currentStartIndex + 3) {
      curso.classList.add('visivel'); // Adiciona 'visivel' para os cursos visíveis
    }
  });
}

btnNext.addEventListener('click', () => {
  if (currentStartIndex + 3 < cursos.length) {
    currentStartIndex += 3;
    atualizarCursos();
  }
});

btnPrev.addEventListener('click', () => {
  if (currentStartIndex - 3 >= 0) {
    currentStartIndex -= 3;
    atualizarCursos();
  }
});

// Inicializa o carrossel mostrando os primeiros 3 cursos
atualizarCursos();

// Função para traduzir o conteúdo da página
const traducoes = {
  pt: {
    
    welcome: "Bem-vindo ao PointlessLearning, a loja mais renomada de venda de Cursos Inúteis!",
    description1: "Navegue pelo incrível catálogo de aprendizado... ou talvez não!",
    description2: "Aqui, você encontrará cursos sobre tudo o que você nunca precisou aprender",
    startNow: "Comece Agora",
    highlightCourses: "Cursos em Destaque",
    allCourses: "VER TODOS OS CURSOS",
    user1Name: "Vanessa Vitória",
    user1Specialization: "Especialista em conversar com cactus",
    user1Comment: "Aprendi muito! Agora consigo conversar com meus cactos, mas eles não parecem gostar de mim, agora estou toda espetada. Preciso de um módulo que os faça gostar de mim.",
    user2Name: "LucasHonoPombosLover",
    user2Specialization: "Sedução de pombos e outras aves",
    user2Comment: "De fato consegui fazer um pombo se apaixonar por mim, mas agora nosso amor se tornou insustentável quando minha família descobriu nossa relação e quando descobri a quantidade de doenças que desenvolvi.",
    user3Name: "HenriqueLoLZerin",
    user3Specialization: "Interprete cego de mudos",
    user3Comment: "Após acabar cego por um acesso de raiva jogando lol, minha vida teria acabado se não fosse esse curso que me ajudou a tornar-me interprete de pessoas mudas.",
  },
  en: {
    welcome: "Welcome to PointlessLearning, the most renowned store for selling Pointless Courses!",
    description1: "Browse the amazing learning catalog... or maybe not!",
    description2: "Here you will find courses on everything you never needed to learn",
    startNow: "Start Now",
    highlightCourses: "Featured Courses",
    allCourses: "VIEW ALL COURSES",
    user1Name: "Vanessa Vitória",
    user1Specialization: "Expert in talking to cacti",
    user1Comment: "I learned a lot! Now I can talk to my cacti, but they don't seem to like me, now I'm all pricked. I need a module that makes them like me.",
    user2Name: "LucasHonoPombosLover",
    user2Specialization: "Pigeon and other bird seduction",
    user2Comment: "I actually managed to make a pigeon fall in love with me, but now our love has become unsustainable when my family found out about our relationship and when I discovered how many diseases I developed.",
    user3Name: "HenriqueLoLZerin",
    user3Specialization: "Blind interpreter for mute people",
    user3Comment: "After going blind due to a rage attack while playing LoL, my life would have ended if it wasn't for this course that helped me become an interpreter for mute people.",
  }
};

// Função para alterar o idioma
const btnIdioma = document.getElementById("btnIdioma");

btnIdioma.addEventListener("click", function() {
  // Troca de idioma entre pt e en
  const idioma = document.documentElement.lang === "pt-BR" ? "en" : "pt";
  document.documentElement.lang = idioma;

  // Atualiza o conteúdo da página conforme o idioma escolhido
  document.querySelector("h1").textContent = traducoes[idioma].welcome;
  document.querySelector(".texto-destaque p:nth-of-type(1)").textContent = traducoes[idioma].description1;
  document.querySelector(".texto-destaque p:nth-of-type(2)").textContent = traducoes[idioma].description2;
  document.getElementById("comprar-destaque").textContent = traducoes[idioma].startNow;

  document.querySelector("section.carrossel-container h2").textContent = traducoes[idioma].highlightCourses;

  // Atualiza o texto de todos os cursos e comentários
  document.querySelector(".ver-todos a").textContent = traducoes[idioma].allCourses;

  document.querySelectorAll(".comentario").forEach((comentario, index) => {
    comentario.querySelector("h3").textContent = traducoes[idioma][`user${index + 1}Name`];
    comentario.querySelector("p:nth-of-type(1)").textContent = traducoes[idioma][`user${index + 1}Specialization`];
    comentario.querySelector("blockquote").textContent = traducoes[idioma][`user${index + 1}Comment`];
  });
});


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
