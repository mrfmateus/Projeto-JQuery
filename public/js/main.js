var frase = $(".frase").text();
var numPalavras = frase.split(/\S+/).length - 1;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var inputDigitacao = $("#digitacao");
inputDigitacao.on("input", function () {
  qtdCaracteres = this.value.length;
  qtdPalavras = this.value.split(/\S+/).length - 1;
  $("#contador-caracteres").text(qtdCaracteres);
  $("#contador-palavras").text(qtdPalavras);
});

var campoTempo = $("#tempo-restante");
inputDigitacao.one("focus", function () {
  var tempoRestante = campoTempo.text();
  var tempoIntervalo = setInterval(function () {
    tempoRestante--;
    campoTempo.text(tempoRestante);
    if (tempoRestante <= 0) {
      inputDigitacao.attr("disabled", true);
      clearInterval(tempoIntervalo);
    }
  }, 1000);
});