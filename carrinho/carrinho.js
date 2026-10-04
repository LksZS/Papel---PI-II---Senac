
const CHAVE_CARRINHO = "carrinho";

class Carrinho {
  constructor() {
    this.itens = this.carregar();
  }

  
  carregar() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
    } catch (erro) {
      return [];
    }
  }

  salvar() {
    try {
      localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(this.itens));
    } catch (erro) {
      
    }
  }

  adicionar(produto) {
    const existente = this.itens.find(item => item.nome === produto.nome);
    if (existente) {
      existente.quantidade++;
    } else {
      this.itens.push({ ...produto, quantidade: 1 });
    }
    this.salvar();
  }

  remover(nome) {
    this.itens = this.itens.filter(item => item.nome !== nome);
    this.salvar();
  }

  // delta = +1 ou -1. Se a quantidade chegar a 0, o item sai do carrinho
  alterarQuantidade(nome, delta) {
    const item = this.itens.find(i => i.nome === nome);
    if (!item) return;
    item.quantidade += delta;
    if (item.quantidade <= 0) {
      this.remover(nome);
    } else {
      this.salvar();
    }
  }

  total() {
    return this.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  }

  quantidadeTotal() {
    return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }

  esvaziar() {
    this.itens = [];
    this.salvar();
  }
}


const carrinho = new Carrinho();

const elVazio = document.getElementById("vazio");
const elConteudo = document.getElementById("conteudo");
const elItens = document.getElementById("itens");
const elContador = document.getElementById("contador");
const elResumoQtd = document.getElementById("resumo-qtd");
const elResumoTotal = document.getElementById("resumo-total");
const elMensagem = document.getElementById("mensagem");

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}


function mostrarCarrinho() {
  const temItens = carrinho.itens.length > 0;

  elVazio.hidden = temItens;
  elConteudo.hidden = !temItens;
  elContador.textContent = carrinho.quantidadeTotal();
  elResumoQtd.textContent = carrinho.quantidadeTotal();
  elResumoTotal.textContent = formatarPreco(carrinho.total());

  elItens.innerHTML = "";

  carrinho.itens.forEach(item => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <div class="imagem">${item.imagem}</div>
      <div>
        <h3></h3>
        <small></small>
        <p>${formatarPreco(item.preco)}</p>
      </div>
      <div class="quantidade">
        <button type="button" data-acao="menos" data-nome="">−</button>
        <span>${item.quantidade}</span>
        <button type="button" data-acao="mais" data-nome="">+</button>
      </div>
      <div class="subtotal">
        <strong>${formatarPreco(item.preco * item.quantidade)}</strong><br>
        <button type="button" class="remover" data-acao="remover" data-nome="">Remover</button>
      </div>
    `;

   
    card.querySelector("h3").textContent = item.nome;
    card.querySelector("small").textContent = item.categoria || "";
    card.querySelectorAll("button").forEach(b => (b.dataset.nome = item.nome));

    elItens.appendChild(card);
  });
}


elItens.addEventListener("click", evento => {
  const botao = evento.target.closest("button");
  if (!botao) return;

  const { acao, nome } = botao.dataset;
  elMensagem.hidden = true;

  if (acao === "mais") carrinho.alterarQuantidade(nome, 1);
  if (acao === "menos") carrinho.alterarQuantidade(nome, -1);
  if (acao === "remover") carrinho.remover(nome);

  mostrarCarrinho();
});

document.getElementById("esvaziar").addEventListener("click", () => {
  carrinho.esvaziar();
  elMensagem.hidden = true;
  mostrarCarrinho();
});

document.getElementById("finalizar").addEventListener("click", () => {
  const total = formatarPreco(carrinho.total());
  const qtd = carrinho.quantidadeTotal();
  carrinho.esvaziar();
  mostrarCarrinho();
  elMensagem.textContent = `Pedido finalizado! ${qtd} item(ns), total de ${total}. Obrigado pela compra.`;
  elMensagem.hidden = false;
});


document.getElementById("exemplo").addEventListener("click", () => {
  carrinho.adicionar({ nome: "Caneta", categoria: "Escrita", preco: 4.90, imagem: "🖊️" });
  carrinho.adicionar({ nome: "Caderno", categoria: "Cadernos", preco: 24.90, imagem: "📓" });
  carrinho.adicionar({ nome: "Mochila", categoria: "Mochilas", preco: 89.90, imagem: "🎒" });
  mostrarCarrinho();
});

mostrarCarrinho();
