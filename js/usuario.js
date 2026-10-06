// Indica no menu quem está logado e mostra a Manutenção só para o admin
// (carregado por todas as páginas)
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (usuarioLogado !== null) {
  const nome = document.createElement("span");
  nome.className = "usuario";
  nome.textContent = "👤 " + (usuarioLogado.nome || usuarioLogado.email);
  document.querySelector("nav").appendChild(nome);
}

if (usuarioLogado === null || usuarioLogado.perfil !== "admin") {
  document.querySelector('nav a[href="produtos.html"]').hidden = true;
}
