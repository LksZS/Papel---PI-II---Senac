const listaClientes = [];

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(cadastrar){
    cadastrar.preventDefault();

    const nome     = document.querySelector    ("#nome");
    const email    = document.querySelector   ("#email");
    const senha    = document.querySelector   ("#senha");
    const cpf      = document.querySelector     ("#cpf");
    const telefone = document.querySelector("#telefone");
    
    const nomeDigitado     = nome.value;
    const emailDigitado    = email.value;
    const senhaDigitado    = senha.value;
    const cpfDigitado      = cpf.value;
    const telefoneDigitado = telefone.value;

    if(!nomeDigitado || !emailDigitado || !senhaDigitado || !cpfDigitado || !telefoneDigitado){
        alert("todos os dados devem ser preenchidos para o cadastro");

    }else{
        alert("cliente cadastrado com sucesso!")

        const cliente ={
            nome: nomeDigitado,
            email: emailDigitado,
            senha: senhaDigitado,
            cpf:   cpfDigitado,
            telefone: telefoneDigitado
        };

        listaClientes.push(cliente);

        console.log(listaClientes);

        localStorage.setItem("email", emailDigitado);
        localStorage.setItem("senha", senhaDigitado);

        localStorage.setItem("cliente", JSON.stringify(listaClientes));

        window.location = "login.html";
    }
})

// Cadastro e armazenamento dos clientes