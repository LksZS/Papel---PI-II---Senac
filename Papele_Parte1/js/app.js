// A vitrine usa os produtos salvos pela Manutenção (js/produtos.js)
const CHAVE_PRODUTOS = "produtos";

// Mesmo carrinho usado pela página carrinho.html
const CHAVE_CARRINHO = "carrinho";

// Usados somente enquanto a Manutenção não salvou nada
const produtosIniciais = [
  { nome: "Caneta", categoria: "Escrita", preco: 4.90, imagem: "🖊️" },
  { nome: "Caderno", categoria: "Cadernos", preco: 24.90, imagem: "📓" },
  { nome: "Mochila", categoria: "Mochilas", preco: 89.90, imagem: "🎒" },
  { nome: "Marca-texto", categoria: "Escrita", preco: 12.90, imagem: "🖍️" },
  { nome: "Caderno Pontilhado", categoria: "Cadernos", preco: 29.90, imagem: "📔" },
  { nome: "Mochila Escolar", categoria: "Mochilas", preco: 99.90, imagem: "🎒" }
];

const salvos = localStorage.getItem(CHAVE_PRODUTOS);

const produtos = salvos === null ? produtosIniciais : JSON.parse(salvos);

let categoriaAtual = "Todos";

const lista = document.getElementById("lista");
const busca = document.getElementById("busca");

// Guarda o produto no mesmo formato que a página do carrinho espera
function adicionarAoCarrinho(produto) {
  const itens = JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];

  const existente = itens.find(item => item.nome === produto.nome);

  if (existente) {
    existente.quantidade++;
  } else {
    itens.push({
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

// Os textos entram com textContent para o nome vindo da Manutenção não virar HTML
function criarCard(produto) {
  const card = document.createElement("div");
  card.className = "produto";

  const imagem = document.createElement("div");
  imagem.className = "imagem";
  imagem.textContent = produto.imagem;

  const categoria = document.createElement("small");
  categoria.textContent = produto.categoria;

  const nome = document.createElement("h3");
  nome.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.textContent = "R$ " + produto.preco.toFixed(2).replace(".", ",");

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Adicionar ao carrinho";
  botao.addEventListener("click", () => adicionarAoCarrinho(produto));

  card.append(imagem, categoria, nome, preco, botao);

  return card;
}

function mostrarProdutos() {
  const texto = busca.value.toLowerCase();

  const filtrados = produtos.filter(produto => {
    const categoriaOk =
      categoriaAtual === "Todos" || produto.categoria === categoriaAtual;

    const buscaOk = produto.nome.toLowerCase().includes(texto);

    return categoriaOk && buscaOk;
  });

  lista.innerHTML = "";

  filtrados.forEach(produto => {
    lista.appendChild(criarCard(produto));
  });
}

function marcarFiltroAtivo() {
  document.querySelectorAll(".filtros button").forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.categoria === categoriaAtual);
  });
}

document.querySelectorAll(".filtros button").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.categoria;
    marcarFiltroAtivo();
    mostrarProdutos();
  });
});

busca.addEventListener("input", mostrarProdutos);

marcarFiltroAtivo();
mostrarProdutos();
