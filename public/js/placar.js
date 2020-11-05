var secPlacar = $(".placar");
var botaoPlacar = $("#botao-placar");
botaoPlacar.click(mostraPlacar);

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