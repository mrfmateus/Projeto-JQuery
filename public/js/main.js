var inputDigitacao = $(".digitacao");
var campoTempo = $("#tempo-restante");
var tempoInicial = campoTempo.text();

$(function () {
  alteraTamanhoFrase();
  adicionaEventoContador();
  inicializaTemporizador();
  inicializaMarcadorBorda();
  $("#botao-reiniciar").click(reiniciaJogo);
});

function alteraTempoInicial(tempo) {
  campoTempo.text(tempo);
}

function alteraTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(/\S+/).length - 1;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function adicionaEventoContador() {
  inputDigitacao.on("input", function () {
    var qtdCaracteres = this.value.length;
    var qtdPalavras = this.value.split(/\S+/).length - 1;
    $("#contador-caracteres").text(qtdCaracteres);
    $("#contador-palavras").text(qtdPalavras);
  });
}

function inicializaTemporizador() {
  inputDigitacao.one("focus", function () {
    var tempoRestante = campoTempo.text();
    var tempoIntervalo = setInterval(function () {
      tempoRestante--;
      campoTempo.text(tempoRestante);
      if (tempoRestante <= 0) {
        clearInterval(tempoIntervalo);
        finalizaJogo();
      }
    }, 1000);
  });
}

function finalizaJogo() {
  inputDigitacao.attr("disabled", true);
  inputDigitacao.toggleClass("campo-desativado");
  inserePlacarNaTabela();
}

function reiniciaJogo() {
  inputDigitacao.attr("disabled", false);
  inputDigitacao.toggleClass("campo-desativado");
  inputDigitacao.val("");
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  inputDigitacao.removeClass("borda-correta");
  inputDigitacao.removeClass("borda-errada");
  campoTempo.text(tempoInicial);
  inicializaTemporizador();
}

function inicializaMarcadorBorda() {
  inputDigitacao.on("input", function () {
    var frase = $(".frase").text();
    var comparar = frase.substr(0, inputDigitacao.val().length);
    var digitado = inputDigitacao.val();
    if (digitado == comparar) {
      inputDigitacao.addClass("borda-correta");
      inputDigitacao.removeClass("borda-errada");
    } else {
      inputDigitacao.addClass("borda-errada");
      inputDigitacao.removeClass("borda-correta");
    }
  });
}