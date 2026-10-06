// Conta fixa do administrador (o mesmo e-mail cadastrado em js/clientes.js).
// É com ela que a Manutenção pode ser liberada se EXIGIR_ADMIN virar true.
const ADMIN_EMAIL = "admin@papel.com";
const ADMIN_SENHA = "admin123";

const CHAVE_CLIENTES = "cliente";

//criaçao da variavel que recebe formulario informado no html
const formulario = document.querySelector("form");

// A senha não fica salva como texto puro (mesma função de js/clientes.js)
function gerarHash(senha) {
  let hash = 0;

  for (let i = 0; i < senha.length; i++) {
    hash = (hash * 31 + senha.charCodeAt(i)) >>> 0;
  }

  return "h" + hash.toString(16);
}

function entrar(nome, email, perfil) {
  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify({ nome: nome, email: email, perfil: perfil })
  );

  window.location = "index.html";
}

//funçao criada apos o usuario clicar o entrar, e criaçao da funçao entrar
formulario.addEventListener("submit", function (entrarNoSite) {
  entrarNoSite.preventDefault();

  //coletando o que o usuario digitou
  const emailDigitado = document.querySelector("#email").value.trim().toLowerCase();
  const senhaDigitada = document.querySelector("#senha").value;

  const clientes = JSON.parse(localStorage.getItem(CHAVE_CLIENTES)) || [];

  // Procura o cliente cadastrado pelo e-mail (não só o último par e-mail/senha)
  const cliente = clientes.find(
    item => (item.email || "").trim().toLowerCase() === emailDigitado
  );

  if (emailDigitado === ADMIN_EMAIL && senhaDigitada === ADMIN_SENHA) {
    alert("Login realizado com sucesso");
    entrar("Administrador", ADMIN_EMAIL, "admin");
  } else if (cliente && cliente.senhaHash === gerarHash(senhaDigitada)) {
    alert("Login realizado com sucesso");
    entrar(cliente.nome, cliente.email, "cliente");
  } else {
    alert("login ou senha invalidos tente novamente!");
  }
});
// validaçao de acesso do cliente
