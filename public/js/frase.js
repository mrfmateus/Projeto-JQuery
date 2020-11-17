$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
  $.get("http://localhost:3000/frases", trocaFrase).fail(function () {
    $("#erro").toggle();
    setTimeout(function () {
      $("#erro").toggle();
    }, 2000);
  });
}

function trocaFrase(data) {
  var numeroAleatorio = Math.floor(Math.random() * data.length);
  var frase = $(".frase");
  frase.text(data[numeroAleatorio].texto);
  alteraTamanhoFrase();
  alteraTempoInicial(data[numeroAleatorio].tempo);
}