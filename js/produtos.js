const CHAVE_PRODUTOS = "produtos";

const CHAVE_USUARIO = "usuarioLogado";

const EXIGIR_ADMIN = false;

const produtosIniciais = [
  { id: 1, nome: "Caneta", categoria: "Escrita", preco: 4.90, imagem: "🖊️" },
  { id: 2, nome: "Caderno", categoria: "Cadernos", preco: 24.90, imagem: "📓" },
  { id: 3, nome: "Mochila", categoria: "Mochilas", preco: 89.90, imagem: "🎒" },
  { id: 4, nome: "Marca-texto", categoria: "Escrita", preco: 12.90, imagem: "🖍️" },
  { id: 5, nome: "Caderno Pontilhado", categoria: "Cadernos", preco: 29.90, imagem: "📔" },
  { id: 6, nome: "Mochila Escolar", categoria: "Mochilas", preco: 99.90, imagem: "🎒" }
];

function verificarAdmin() {
  if (!EXIGIR_ADMIN) {
    return;
  }

  const usuario = JSON.parse(localStorage.getItem(CHAVE_USUARIO));

  if (usuario === null || usuario.perfil !== "admin") {
    alert("Acesso restrito ao administrador.");
    window.location.href = "login.html";
  }
}

verificarAdmin();

function carregarProdutos() {
  const salvos = localStorage.getItem(CHAVE_PRODUTOS);

  if (salvos === null) {
    return produtosIniciais;
  }

  return JSON.parse(salvos);
}

function salvarProdutos() {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos));
}

let produtos = carregarProdutos();

const form = document.getElementById("formProduto");
const tituloForm = document.getElementById("tituloForm");
const campoId = document.getElementById("produtoId");
const campoNome = document.getElementById("nome");
const campoCategoria = document.getElementById("categoria");
const campoPreco = document.getElementById("preco");
const campoImagem = document.getElementById("imagem");
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");
const tabela = document.getElementById("tabelaProdutos");
const total = document.getElementById("total");
const mensagem = document.getElementById("mensagem");

function formatarPreco(preco) {
  return "R$ " + preco.toFixed(2).replace(".", ",");
}

function criarCelula(texto, classe) {
  const celula = document.createElement("td");
  celula.textContent = texto;

  if (classe) {
    celula.className = classe;
  }

  return celula;
}

function mostrarTabela() {
  tabela.innerHTML = "";
  total.textContent = produtos.length + " produto(s)";

  if (produtos.length === 0) {
    const linha = document.createElement("tr");
    const celula = criarCelula("Nenhum produto cadastrado. Use o formulário para cadastrar o primeiro.", "vazio");
    celula.colSpan = 5;
    linha.appendChild(celula);
    tabela.appendChild(linha);
    return;
  }

  produtos.forEach(produto => {
    const linha = document.createElement("tr");

    linha.appendChild(criarCelula(produto.imagem, "coluna-imagem"));
    linha.appendChild(criarCelula(produto.nome));
    linha.appendChild(criarCelula(produto.categoria));
    linha.appendChild(criarCelula(formatarPreco(produto.preco)));

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.className = "botao-editar";
    botaoEditar.addEventListener("click", () => editarProduto(produto.id));

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.addEventListener("click", () => excluirProduto(produto.id));

    const acoes = document.createElement("td");
    acoes.appendChild(botaoEditar);
    acoes.appendChild(botaoExcluir);
    linha.appendChild(acoes);

    tabela.appendChild(linha);
  });
}

function mostrarErro(campo, idErro, texto) {
  document.getElementById(idErro).textContent = texto;

  if (texto === "") {
    campo.classList.remove("invalido");
  } else {
    campo.classList.add("invalido");
  }
}

function limparErros() {
  mostrarErro(campoNome, "erroNome", "");
  mostrarErro(campoCategoria, "erroCategoria", "");
  mostrarErro(campoPreco, "erroPreco", "");
  mostrarErro(campoImagem, "erroImagem", "");
}

function validarFormulario() {
  limparErros();

  let valido = true;

  const id = Number(campoId.value);
  const nome = campoNome.value.trim();
  const preco = Number(campoPreco.value);

  const nomeRepetido = produtos.some(produto =>
    produto.nome.toLowerCase() === nome.toLowerCase() && produto.id !== id
  );

  if (nome.length < 3) {
    mostrarErro(campoNome, "erroNome", "Informe um nome com pelo menos 3 letras.");
    valido = false;
  } else if (nomeRepetido) {
    mostrarErro(campoNome, "erroNome", "Já existe um produto com esse nome.");
    valido = false;
  }

  if (campoCategoria.value === "") {
    mostrarErro(campoCategoria, "erroCategoria", "Selecione uma categoria.");
    valido = false;
  }

  if (campoPreco.value === "" || isNaN(preco) || preco <= 0) {
    mostrarErro(campoPreco, "erroPreco", "Informe um preço maior que zero.");
    valido = false;
  }

  if (campoImagem.value.trim() === "") {
    mostrarErro(campoImagem, "erroImagem", "Informe um emoji para o produto.");
    valido = false;
  }

  return valido;
}

function gerarId() {
  let maior = 0;

  produtos.forEach(produto => {
    if (produto.id > maior) {
      maior = produto.id;
    }
  });

  return maior + 1;
}

function salvarProduto(evento) {
  evento.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  const dados = {
    nome: campoNome.value.trim(),
    categoria: campoCategoria.value,
    preco: Number(campoPreco.value),
    imagem: campoImagem.value.trim()
  };

  if (campoId.value === "") {
    dados.id = gerarId();
    produtos.push(dados);
    mostrarMensagem("Produto \"" + dados.nome + "\" cadastrado.");
  } else {
    dados.id = Number(campoId.value);
    const posicao = produtos.findIndex(produto => produto.id === dados.id);
    produtos[posicao] = dados;
    mostrarMensagem("Produto \"" + dados.nome + "\" alterado.");
  }

  salvarProdutos();
  limparFormulario();
  mostrarTabela();
}

function editarProduto(id) {
  const produto = produtos.find(produto => produto.id === id);

  limparErros();

  campoId.value = produto.id;
  campoNome.value = produto.nome;
  campoCategoria.value = produto.categoria;
  campoPreco.value = produto.preco;
  campoImagem.value = produto.imagem;

  tituloForm.textContent = "Editar produto";
  botaoSalvar.textContent = "Salvar alterações";
  botaoCancelar.hidden = false;

  campoNome.focus();
}

function limparFormulario() {
  form.reset();
  campoId.value = "";
  limparErros();

  tituloForm.textContent = "Novo produto";
  botaoSalvar.textContent = "Cadastrar produto";
  botaoCancelar.hidden = true;
}

function excluirProduto(id) {
  const produto = produtos.find(produto => produto.id === id);

  if (!confirm("Excluir o produto \"" + produto.nome + "\"?")) {
    return;
  }

  produtos = produtos.filter(produto => produto.id !== id);
  salvarProdutos();

  if (Number(campoId.value) === id) {
    limparFormulario();
  }

  mostrarTabela();
  mostrarMensagem("Produto \"" + produto.nome + "\" excluído.");
}

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add("visivel");

  setTimeout(() => {
    mensagem.classList.remove("visivel");
  }, 3000);
}

form.addEventListener("submit", salvarProduto);
botaoCancelar.addEventListener("click", limparFormulario);

mostrarTabela();
