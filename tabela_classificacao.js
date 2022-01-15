var imagens_avatares = [
  "https://cdn-icons-png.flaticon.com/512/188/188990.png",
  "https://cdn-icons-png.flaticon.com/512/188/188997.png",
  "https://cdn-icons-png.flaticon.com/512/188/188995.png",
  "https://cdn-icons-png.flaticon.com/512/188/188988.png",
  "https://cdn.icon-icons.com/icons2/851/PNG/512/pikachu_icon-icons.com_67535.png"
];
// objeto
rafa = {
  nome: "Rafa",
  imagem: imagens_avatares[0],
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};
paulo = {
  nome: "Paulo",
  imagem: imagens_avatares[1],
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};
gui = {
  nome: "Gui",
  imagem: imagens_avatares[2],
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};

// lista de objetos
var jogadores = [rafa, paulo, gui];
exibirJogadoresNaTela(jogadores);
preencherListaJogadores("lista__jogadores__remover");
preencherListaJogadores("lista__jogadores__resetar");
preencherImagensAvataresOpcoes();

function preencherImagensAvataresOpcoes() {
  var div_opcoes = document.getElementById("imagens__avatares__opcoes");
  for (var i = 0; i < imagens_avatares.length; i++) {
    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "imagens__avatar");
    input.setAttribute("id", "imagem" + i);
    input.classList.add("input__radio__imagens__avatares");
    input.value = imagens_avatares[i];
    div_opcoes.appendChild(input);

    var label = document.createElement("label");
    label.classList.add("label__imagens__avatares");
    label.setAttribute("for", "imagem" + i);

    var img = document.createElement("img");
    img.classList.add("imagem__imagens__avatares");
    img.src = imagens_avatares[i];

    label.appendChild(img);
    div_opcoes.appendChild(label);
  }
}

function inserirOption(id__select, jogador) {
  var select = document.getElementById(id__select);
  var option = document.createElement("option");
  option.setAttribute("value", jogador.nome);
  option.setAttribute("id", jogador.nome);
  option.appendChild(document.createTextNode(jogador.nome));
  select.appendChild(option);
}

function removeOption(id__select, nome_jogador) {
  var select = document.getElementById(id__select);
  var option = document.getElementById(nome_jogador);
  select.removeChild(option);
}

function preencherListaJogadores(id__select) {
  for (var i = 0; i < jogadores.length; i++) {
    inserirOption(id__select, jogadores[i]);
  }
}

function ordenaJogadores() {
  jogadores.sort(function (jogador1, jogador2) {
    return jogador2.pontos - jogador1.pontos;
  });
}

function exibeGanhador() {
  if (jogadores.length > 0) {
    document.getElementById('div__ganhador').style.display = "flex";
    document.getElementById("avatar__ganhador").src = jogadores[0].imagem;
    document.getElementById("nome__ganhador").innerHTML = jogadores[0].nome;
    document.getElementById("pontos__ganhador").innerHTML =
      jogadores[0].pontos + " pontos";
  }
  else{
    document.getElementById('div__ganhador').style.display = "none";
  }
}

function exibirJogadoresNaTela(jogadores) {
  ordenaJogadores();
  exibeGanhador();
  var elemento = "";
  for (var i = 0; i < jogadores.length; i++) {
    elemento += "<tr>";
    elemento +=
      "<td> <div class='jogador'> <img class='avatar__jogador' src='" +
      jogadores[i].imagem +
      "' alt='avatarjogador'>" +
      jogadores[i].nome +
      "</div> </td>";
    elemento += "<td>" + jogadores[i].vitorias + "</td>";
    elemento += "<td>" + jogadores[i].empates + "</td>";
    elemento += "<td>" + jogadores[i].derrotas + "</td>";
    elemento += "<td>" + jogadores[i].pontos + "</td>";
    elemento +=
      "<td><button class='botao__roxo vitoria' onClick='adicionarVitoria(" +
      i +
      ")'>Vitória</button></td>";
    elemento +=
      "<td><button class='botao__roxo empate' onClick='adicionarEmpate(" +
      i +
      ")'>Empate</button></td>";
    elemento +=
      "<td><button class='botao__roxo derrota' onClick='adicionarDerrota(" +
      i +
      ")'>Derrota</button></td>";
    elemento += " </tr>";
  }
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

function calcularPontos(jogador) {
  return jogador.vitorias * 3 + jogador.empates;
}

function desabilitarBotao(nomeClasse, estado) {
  var botoes = document.getElementsByClassName(nomeClasse);
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].disabled = estado;
  }
}

function adicionarVitoria(i) {
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calcularPontos(jogador);

  botaoDerrotaJogador = document.getElementsByClassName("derrota")[i];

  // se o botao derrota não estiver desativado significa que foi o primeiro a ser selecioando
  if (botaoDerrotaJogador.disabled == false) {
    desabilitarBotao("empate", true);
    desabilitarBotao("vitoria", true);
    botaoDerrotaJogador.disabled = true;
  } else {
    desabilitarBotao("empate", false);
    desabilitarBotao("vitoria", false);
    botaoDerrotaJogador.disabled = false;
    // ordenar a lista como um ranking
    exibirJogadoresNaTela(jogadores);
  }
}

function adicionarEmpate(i) {
  var jogador = jogadores[i];
  jogador.empates++;
  jogador.pontos = calcularPontos(jogador);

  botaoDerrotaJogador = document.getElementsByClassName("derrota")[i];

  // se o botao derrota não estiver desativado significa que foi o primeiro a ser selecioando
  if (botaoDerrotaJogador.disabled == false) {
    desabilitarBotao("derrota", true);
    desabilitarBotao("vitoria", true);
    document.getElementsByClassName("empate")[i].disabled = true;
  } else {
    desabilitarBotao("derrota", false);
    desabilitarBotao("vitoria", false);
    document.getElementsByClassName("empate")[i].disabled = false;
    // ordenar a lista como um ranking
    exibirJogadoresNaTela(jogadores);
  }
}

function adicionarDerrota(i) {
  var jogador = jogadores[i];
  jogador.derrotas++;
  jogador.pontos = calcularPontos(jogador);

  botaoVitoriaJogador = document.getElementsByClassName("vitoria")[i];

  // se o botao derrota não estiver desativado significa que foi o primeiro a ser selecioando
  if (botaoVitoriaJogador.disabled == false) {
    desabilitarBotao("derrota", true);
    desabilitarBotao("empate", true);
    botaoVitoriaJogador.disabled = true;
  } else {
    desabilitarBotao("derrota", false);
    desabilitarBotao("empate", false);
    botaoVitoriaJogador.disabled = false;
    // ordenar a lista como um ranking
    exibirJogadoresNaTela(jogadores);
  }
}

function resetarPontos() {
  var mensagem_span = document.getElementById("mensagem__reseta");
  var select = document.getElementById("lista__jogadores__resetar");
  var jogador_selecionado = select.options[select.selectedIndex].value;
  if (jogador_selecionado == "todos") {
    for (var i = 0; i < jogadores.length; i++) {
      zerarPontos(jogadores[i]);
      exibeMensagem(mensagem_span, "sucesso", "Os pontos foram resetados");
    }
  } else {
    indice = procurarJogador(jogador_selecionado);
    console.log(jogadores[indice]);
    zerarPontos(jogadores[indice]);
    exibeMensagem(
      mensagem_span,
      "sucesso",
      "Os pontos de " + jogador_selecionado + " foram resetados"
    );
  }
  exibirJogadoresNaTela(jogadores);
}

function zerarPontos(jogador) {
  jogador.pontos = 0;
  jogador.empates = 0;
  jogador.vitorias = 0;
  jogador.derrotas = 0;
}

function removerJogadores() {
  var mensagem_span = document.getElementById("mensagem__remover");
  var select = document.getElementById("lista__jogadores__remover");
  var jogador_selecionado = select.options[select.selectedIndex].value;
  if (jogador_selecionado == "todos") {
    aviso = confirm("Você tem certeza que quer remover todos os jogadores?");
    if (aviso == true) {
      for (var i = 0; i < jogadores.length; i++) {
        removeOption("lista__jogadores__resetar", jogadores[i].nome);
        removeOption("lista__jogadores__remover", jogadores[i].nome);
      }
      jogadores = [];
      exibeMensagem(
        mensagem_span,
        "sucesso",
        "Todos os jogadores foram removidos"
      );
    }
  } else {
    indice = procurarJogador(jogador_selecionado);
    jogadores.splice(indice, 1);
    removeOption("lista__jogadores__resetar", jogador_selecionado);
    removeOption("lista__jogadores__remover", jogador_selecionado);
    exibeMensagem(
      mensagem_span,
      "sucesso",
      "O jogador " + jogador_selecionado + " foi removido"
    );
  }
  exibirJogadoresNaTela(jogadores);
}

function procurarJogador(nome_jogador) {
  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i].nome == nome_jogador) {
      return i;
    }
  }
}

function AdicionarJogador() {
  var nomesIguais = false;
  var mensagem_span = document.getElementById("mensagem__adiciona");
  var nome = document.getElementById("nome__jogador").value;

  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i].nome == nome) {
      exibeMensagem(mensagem_span, "erro", "Um jogador já possui esse nome");
      nomesIguais = true;
    }
  }

  if (!nomesIguais) {
    var imagem = document.querySelector(
      'input[name="imagens__avatar"]:checked'
    );
    if (imagem != null) {
      var novoJogador = {
        nome: nome,
        imagem: imagem.value,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        pontos: 0
      };
      jogadores.push(novoJogador);
      inserirOption("lista__jogadores__resetar", novoJogador);
      inserirOption("lista__jogadores__remover", novoJogador);
      exibeMensagem(mensagem_span, "sucesso", "Jogador inserido");
      exibirJogadoresNaTela(jogadores);

      // limpar campos
      document.getElementById("nome__jogador").value = "";
      imagem.checked = false;
    } else {
      exibeMensagem(mensagem_span, "erro", "Escolha uma imagem de avatar");
    }
  }
}

function exibeMensagem(mensagem_span, classe, mensagem) {
  mensagem_span.classList.add(classe);
  mensagem_span.innerHTML = mensagem;
  setTimeout(() => {
    mensagem_span.innerHTML = "";
    mensagem_span.classList.remove(classe);
  }, 1000);
}
