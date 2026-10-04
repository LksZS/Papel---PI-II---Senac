
//criaçao da variavel que recebe formulario informado no html
const formulario = document.querySelector("form");
//funçao criada apos o usuario clicar o entrar, e criaçao da funçao entrar

const emailSalvo = localStorage.getItem("email");

const senhaSalvo = localStorage.getItem("senha");

const clientesSalvos = localStorage.getItem("cliente");

const clientes = JSON.parse(clientesSalvos);

console.log(clientes);

formulario.addEventListener("submit", function(entrar){

    entrar.preventDefault();
    //coletando o que o usuario digitou

    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");

    const emailDigitado = email.value;
    const senhaDigitada = senha.value;

    if(emailDigitado === emailSalvo && senhaDigitada === senhaSalvo){
        alert("Login realizado com sucesso");
    }else{
        alert("login ou senha invalidos tente novamente!")
    }

    
});
// validaçao de acesso do cliente
