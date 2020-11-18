$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-especifica").click(fraseEspecifica);

function fraseAleatoria() {
  $("#spinner").toggle();
  $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function () {
      $("#erro").toggle();
      setTimeout(function () {
        $("#erro").toggle();
      }, 2000);
    })
    .always(function () {
      $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
  var numeroAleatorio = Math.floor(Math.random() * data.length);
  var frase = $(".frase");
  frase.text(data[numeroAleatorio].texto);
  alteraTamanhoFrase();
  alteraTempoInicial(data[numeroAleatorio].tempo);
}

function fraseEspecifica() {
  var idFrase = $("#input-frase-especifica").val();
  var dados = {
    id: idFrase
  };

  $("#spinner").toggle();
  $.get("http://localhost:3000/frases", dados, trocaFraseEspecifica)
    .fail(function () {
      $("#erro").toggle();
      setTimeout(function () {
        $("#erro").toggle();
      }, 2000);
    })
    .always(function () {
      $("#spinner").toggle();
    });
}

function trocaFraseEspecifica(data) {
  var frase = $(".frase");
  frase.text(data.texto);
  alteraTamanhoFrase();
  alteraTempoInicial(data.tempo);
}