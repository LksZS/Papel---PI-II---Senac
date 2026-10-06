const CHAVE_PRODUTOS = "produtos";
const CHAVE_CARRINHO = "carrinho";

const produtosIniciais = [
  { id: 1, nome: "Caneta", categoria: "Escrita", preco: 4.90, imagem: "🖊️" },
  { id: 2, nome: "Caderno", categoria: "Cadernos", preco: 24.90, imagem: "📓" },
  { id: 3, nome: "Mochila", categoria: "Mochilas", preco: 89.90, imagem: "🎒" },
  { id: 4, nome: "Marca-texto", categoria: "Escrita", preco: 12.90, imagem: "🖍️" },
  { id: 5, nome: "Caderno Pontilhado", categoria: "Cadernos", preco: 29.90, imagem: "📔" },
  { id: 6, nome: "Mochila Escolar", categoria: "Mochilas", preco: 99.90, imagem: "🎒" }
];

function carregarProdutos() {
  const salvos = localStorage.getItem(CHAVE_PRODUTOS);
  return salvos ? JSON.parse(salvos) : produtosIniciais;
}

let produtos = carregarProdutos();
let categoriaAtual = "Todos";

const lista = document.getElementById("lista");
const busca = document.getElementById("busca");

function mostrarProdutos() {
  const texto = busca.value.toLowerCase();

  const filtrados = produtos.filter(produto => {
    const categoriaOk = categoriaAtual === "Todos" || produto.categoria === categoriaAtual;
    const buscaOk = produto.nome.toLowerCase().includes(texto);
    return categoriaOk && buscaOk;
  });

  lista.innerHTML = "";

  filtrados.forEach(produto => {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
      <div class="imagem">${produto.imagem}</div>
      <small>${produto.categoria}</small>
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
      <button type="button">Adicionar ao carrinho</button>
    `;

    card.querySelector("button").addEventListener("click", () => adicionarAoCarrinho(produto));
    lista.appendChild(card);
  });
}

function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || "[]");
  const existente = carrinho.find(item => item.nome === produto.nome);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}

document.querySelectorAll(".filtros button").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.categoria;
    mostrarProdutos();
  });
});

busca.addEventListener("input", mostrarProdutos);
mostrarProdutos();
