$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#logradouro").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');
        //Verifica se campo cep possui valor informado.
        if (cep !== "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;
            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});

function enviar() {
    //Variaveis que recebem valor dos inputs e depois são atribuidas ao JSON
    var nomeValue = document.querySelector("#nome").value;
    var dataNascimentoValue = document.querySelector("#dataNascimento").value;
    var cpfValue = document.querySelector("#cpf").value;
    var celularValue = document.querySelector("#celular").value;
    var emailValue = document.querySelector("#email").value;
    var cepValue = document.querySelector("#cep").value;
    var logradouroValue = document.querySelector("#logradouro").value;
    var numeroValue = document.querySelector("#numero").value;
    var bairroValue = document.querySelector("#bairro").value;
    var cidadeValue = document.querySelector("#cidade").value;
    var ufValue = document.querySelector("#uf").value;
    var descricaoValue = document.querySelector("#descricao").value;

    var formValue = {
        nome: nomeValue,
        dataNascimento: dataNascimentoValue,
        cpf: cpfValue,
        celular: celularValue,
        email: emailValue,
        cep: cepValue,
        logradouro: logradouroValue,
        numero: numeroValue,
        bairro: bairroValue,
        cidade: cidadeValue,
        uf: ufValue,
        descricao: descricaoValue
    };
    toastr.success('Dados validados com sucesso', formValue);
    console.log(' Dados Corretos');
    console.log(formValue);
}
;

function formatar_mascara(src, mascara) {
    var campo = src.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(campo);
    if (texto.substring(0, 1) !== saida) {
        src.value += texto.substring(0, 1);
    }
}
