var secPlacar = $(".placar");
var botaoPlacar = $("#botao-placar");
var botaoSincronizar = $("#botao-sync");
botaoPlacar.click(mostraPlacar);
botaoSincronizar.click(sincronizaPlacar);

function inserePlacarNaTabela() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Mateus";
  var qtdPalavras = $("#contador-palavras").text();
  var linhaNova = criaLinhaNova(usuario, qtdPalavras);
  linhaNova.find(".botao-remover").click(removePlacarDaTabela);
  corpoTabela.prepend(linhaNova);
  secPlacar.slideDown(500);
  scrollPlacar();
}

function criaLinhaNova(usuario, palavras) {
  var linha = $("<tr>");
  var colNome = $("<td>").text(usuario);
  var colPalavras = $("<td>").text(palavras);
  var colRemover = $("<td>");
  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("material-icons").text("delete");

  link.append(icone);
  colRemover.append(link);
  linha.append(colNome);
  linha.append(colPalavras);
  linha.append(colRemover);

  return linha;
}

function removePlacarDaTabela() {
  event.preventDefault();
  var linha = $(this).parent().parent();
  linha.fadeOut(700);
  setTimeout(function () {
    linha.remove();
  }, 700);
}

function mostraPlacar(event) {
  secPlacar.stop().slideToggle(500);
}

function scrollPlacar() {
  var posicaoPlacar = secPlacar.offset().top;
  $("html, body").animate({
    scrollTop: posicaoPlacar + "px"
  }, 1000);
}

function sincronizaPlacar() {
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function () {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score);
  });

  var dados = {
    placar: placar
  }

  $.post("http://localhost:3000/placar", dados);
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function (data) {
    $(data).each(function () {
      var linha = criaLinhaNova(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removePlacarDaTabela);
      $("tbody").append(linha);
    });
  });
}