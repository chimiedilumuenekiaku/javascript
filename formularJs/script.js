function validar(){
    
    // Receber os dados do formulario
    const nome = formuser.nome.value;
    const email = formuser.email.value;
    const senha = formuser.senha.value;
    const rep_senha = formuser.rep_senha.value;

    // Validaçao do Nome
    if(!validarNome(nome)){
        exibirAlerta('warning','Nome invalido','Preecha o campo nome!');
        return false;
    }

    // Validaçao do Email
    if(!validarEmail(email)){
        exibirAlerta('warning','E-mail invalido','Preecha o campo email!');
        return false;
    }

    // Validaçao da senha
    if(!validarSenha(senha)){
        exibirAlerta('warning','Senha invalida','Preecha o campo senha com minimo 6 caracteres!');
        return false;
    }

    // Verificar se as senhas coincidem
    if(senha !== rep_senha){
        exibirAlerta('error','Senhas coincidem','O campo confirmaçao da senha deve ser igual à senha!');
        return false;
    }

    // Mensagem de sucesso se todas informações
    exibirAlerta('success','Tudo certo','Formulario validado com sucesso.');

    // Retornar falso so para apresentar o alerta que passou pela validacao
    return false;

    // return true;

}

function validarNome(nome){
    return nome.trim().length > 0; // Verifica se o nome não esta vazio;
}

function validarEmail(email){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email); // Expressao regular para validar o formato de e-mail
}

function validarSenha(senha){
    return senha.length > 5;
}


function exibirAlerta(icone, titulo, texto){
    Swal.fire({
        icon: icone,
        title: titulo,
        text: texto,
      });
}