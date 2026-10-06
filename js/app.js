const CHAVE_PRODUTOS = "produtos";
const CHAVE_CARRINHO = "carrinho";

const produtos = [
  { id: 1, nome: "Caneta", categoria: "Escrita", preco: 4.90, imagem: "🖊️" },
  { id: 2, nome: "Caderno", categoria: "Cadernos", preco: 24.90, imagem: "📓" },
  { id: 3, nome: "Mochila", categoria: "Mochilas", preco: 89.90, imagem: "🎒" },
  { id: 4, nome: "Marca-texto", categoria: "Escrita", preco: 12.90, imagem: "🖍️" },
  { id: 5, nome: "Caderno Pontilhado", categoria: "Cadernos", preco: 29.90, imagem: "📔" },
  { id: 6, nome: "Mochila Escolar", categoria: "Mochilas", preco: 99.90, imagem: "🎒" }
];

let categoriaAtual = "Todos";

const lista = document.getElementById("lista");
const busca = document.getElementById("busca");

function mostrarProdutos() {
  const texto = busca.value.toLowerCase();

  const filtrados = produtos.filter(produtos => {
    const categoriaOk = categoriaAtual === "Todos" || produtos.categoria === categoriaAtual;
    const buscaOk = produtos.nome.toLowerCase().includes(texto);
    return categoriaOk && buscaOk;
  });

  lista.innerHTML = "";

  filtrados.forEach(produtos => {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
      <div class="imagem">${produtos.imagem}</div>
      <small>${produtos.categoria}</small>
      <h3>${produtos.nome}</h3>
      <p>R$ ${produtos.preco.toFixed(2).replace(".", ",")}</p>
      <button type="button">Adicionar ao carrinho</button>
    `;

    card.querySelector("button").addEventListener("click", () => adicionarAoCarrinho(produto));
    lista.appendChild(card);
  });
}

function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || "[]");
  const existente = carrinho.find(item => item.nome === produtos.nome);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...produtos, quantidade: 1 });
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
