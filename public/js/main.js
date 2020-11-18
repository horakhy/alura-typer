var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function () { /* Calls these functions as soon as the page is loaded, you can use just $ */
    updateSentence();
    startCounters();
    startChronometer();
    startMarkers();
    $("#botao-reiniciar").click(restartGame);
});

function updateSentence() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}



function startCounters() {
    campo.on("input", function () {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function startChronometer() {

    var tempoRestante = $("#tempo-digitacao").text();
    $("#botao-reiniciar").attr("disabled", true);
    campo.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante <= 0) {
                clearInterval(cronometroID);
                endGame();
            }
        }, 1000);
    });
}

function endGame(){
    campo.attr("disabled", true);
                campo.toggleClass("campo-desativado");
                $("#botao-reiniciar").attr("disabled", false);
                addToScoreboard();
}

function startMarkers() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length); // Stores only the part of the sentence that should be already written by the user

        //console.log(digitado);
        if (comparavel == digitado) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }
        else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}


function restartGame() {
    campo.toggleClass("campo-desativado"); // Turn on or  off the Class
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");

    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    startChronometer();
}





