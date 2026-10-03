const produtos = [
  { nome: "Caneta", categoria: "Escrita", preco: 4.90, imagem: "🖊️" },
  { nome: "Caderno", categoria: "Cadernos", preco: 24.90, imagem: "📓" },
  { nome: "Mochila", categoria: "Mochilas", preco: 89.90, imagem: "🎒" },
  { nome: "Marca-texto", categoria: "Escrita", preco: 12.90, imagem: "🖍️" },
  { nome: "Caderno Pontilhado", categoria: "Cadernos", preco: 29.90, imagem: "📔" },
  { nome: "Mochila Escolar", categoria: "Mochilas", preco: 99.90, imagem: "🎒" }
];

let categoriaAtual = "Todos";

const lista = document.getElementById("lista");
const busca = document.getElementById("busca");

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
    const card = document.createElement("div");
    card.className = "produto";

    card.innerHTML = `
      <div class="imagem">${produto.imagem}</div>
      <small>${produto.categoria}</small>
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
      <button onclick="selecionarProduto('${produto.nome}')">
        Ver produto
      </button>
    `;

    lista.appendChild(card);
  });
}

function selecionarProduto(nome) {
  alert("Produto selecionado: " + nome);
}

document.querySelectorAll(".filtros button").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.categoria;
    mostrarProdutos();
  });
});

busca.addEventListener("input", mostrarProdutos);

mostrarProdutos();
