var inputDigitacao = $(".digitacao");
var campoTempo = $("#tempo-restante");
var tempoInicial = campoTempo.text();
var frase = $(".frase").text();

$(function () {
  alteraTamanhoFrase();
  adicionaEventoContador();
  inicializaTemporizador();
  inicializaMarcadorBorda();
  $("#botao-reiniciar").click(reiniciaJogo);
});

function alteraTamanhoFrase() {
  var numPalavras = frase.split(/\S+/).length - 1;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function adicionaEventoContador() {
  inputDigitacao.on("input", function () {
    qtdCaracteres = this.value.length;
    qtdPalavras = this.value.split(/\S+/).length - 1;
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

function inserePlacarNaTabela() {
  var corpoTabela = $(".placar").find("tbody");
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