// E-mail fixo do administrador (o mesmo de js/login.js)
const ADMIN_EMAIL = "admin@papel.com";

const CHAVE_CLIENTES = "cliente";

const formulario = document.querySelector("form");

// A senha não é guardada como texto puro
function gerarHash(senha) {
    let hash = 0;

    for (let i = 0; i < senha.length; i++) {
        hash = (hash * 31 + senha.charCodeAt(i)) >>> 0;
    }

    return "h" + hash.toString(16);
}

// Confere os dígitos verificadores do CPF
function cpfValido(cpf) {
    const numeros = cpf.replace(/\D/g, "");

    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    for (let digito = 9; digito < 11; digito++) {
        let soma = 0;

        for (let i = 0; i < digito; i++) {
            soma += Number(numeros[i]) * (digito + 1 - i);
        }

        const resto = (soma * 10) % 11;
        const esperado = resto === 10 ? 0 : resto;

        if (esperado !== Number(numeros[digito])) {
            return false;
        }
    }

    return true;
}

formulario.addEventListener("submit", function (cadastrar) {
    cadastrar.preventDefault();

    const nomeDigitado = document.querySelector("#nome").value;
    const emailDigitado = document.querySelector("#email").value;
    const senhaDigitado = document.querySelector("#senha").value;
    const cpfDigitado = document.querySelector("#cpf").value;
    const telefoneDigitado = document.querySelector("#telefone").value;

    if (!nomeDigitado || !emailDigitado || !senhaDigitado || !cpfDigitado || !telefoneDigitado) {
        alert("todos os dados devem ser preenchidos para o cadastro");
        return;
    }

    if (!cpfValido(cpfDigitado)) {
        alert("Informe um CPF válido.");
        return;
    }

    // Carrega a lista já cadastrada em vez de começar vazia a cada carregamento
    const clientes = JSON.parse(localStorage.getItem(CHAVE_CLIENTES)) || [];

    const emailJaCadastrado =
        emailDigitado.trim().toLowerCase() === ADMIN_EMAIL ||
        clientes.some(
            cliente => (cliente.email || "").trim().toLowerCase() === emailDigitado.trim().toLowerCase()
        );

    if (emailJaCadastrado) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    clientes.push({
        nome: nomeDigitado,
        email: emailDigitado,
        senhaHash: gerarHash(senhaDigitado),
        cpf: cpfDigitado,
        telefone: telefoneDigitado
    });

    localStorage.setItem(CHAVE_CLIENTES, JSON.stringify(clientes));

    alert("cliente cadastrado com sucesso!");
    window.location = "login.html";
});

// Cadastro e armazenamento dos clientes
