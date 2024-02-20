document.addEventListener("DOMContentLoaded", function() {
    // Dados iniciais da tabela de classificação
    let tabelaClassificacao = [
      { posicao: 1, nome: "We Already Won", time: "Time A", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 2, nome: "Brinks FC", time: "Time B", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 3, nome: "Palmeiras", time: "Time C", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 4, nome: "Corinthians", time: "Time D", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 5, nome: "Bragantino", time: "Time E", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 6, nome: "Grêmio", time: "Time F", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 7, nome: "Internacional", time: "Time G", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 8, nome: "Girona", time: "Time H", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 9, nome: "Inter Miami", time: "Time I", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 10, nome: "Warriors", time: "Time J", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 11, nome: "Laranja Mecanica", time: "Time K", pontos: 0, jogos: 0, saldoGols: 0 },
      { posicao: 12, nome: "Ibis Blue", time: "Time L", pontos: 0, jogos: 0, saldoGols: 0 },
    ];
  
    const rodadas = [
      [
          { timeA: "Time A", timeB: "Time B" },
          { timeA: "Time C", timeB: "Time D" },
          { timeA: "Time E", timeB: "Time F" },
          { timeA: "Time G", timeB: "Time H" },
          { timeA: "Time I", timeB: "Time J" },
          { timeA: "Time K", timeB: "Time L" }
      ],
      [
          { timeA: "Time A", timeB: "Time C" },
          { timeA: "Time B", timeB: "Time D" },
          { timeA: "Time E", timeB: "Time G" },
          { timeA: "Time F", timeB: "Time H" },
          { timeA: "Time I", timeB: "Time K" },
          { timeA: "Time J", timeB: "Time L" }
      ],
      [
          { timeA: "Time A", timeB: "Time D" },
          { timeA: "Time B", timeB: "Time C" },
          { timeA: "Time E", timeB: "Time I" },
          { timeA: "Time F", timeB: "Time G" },
          { timeA: "Time H", timeB: "Time K" },
          { timeA: "Time J", timeB: "Time L" }
      ],
      // Adicione mais rodadas conforme necessário
  ];
  
    // Geração de rodadas
  const numTimes = tabelaClassificacao.length;
    for (let i = 0; i < numTimes - 1; i++) {
    const rodada = [];
    for (let j = 0; j < numTimes / 2; j++) {
      rodada.push({ timeA: tabelaClassificacao[j].time, timeB: tabelaClassificacao[numTimes - 1 - j].time });
    }
    rodadas.push(rodada);
  
    // Rotacionar os times para os próximos jogos
    tabelaClassificacao.splice(1, 0, tabelaClassificacao.pop());
  }
  
    let rodadaAtual = 0;
    let placares = []; // Definindo a variável placares
    
    // Função para atualizar a tabela de classificação
    function atualizarTabelaClassificacao() {
      const tbody = document.querySelector("#tabela-classificacao tbody");
      tbody.innerHTML = "";
    
      tabelaClassificacao.forEach((time) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td id="posColor">${time.posicao}</td>
                          <td class="time-info">
                            <img src="escudos/${time.time}.png" alt="${time.time}" class="escudo">
                            <span id="nomeColor">${time.nome}</span>
                          </td>
                          <td id="pontosColor">${time.pontos}</td>
                          <td id="pontosColor">${time.jogos}</td>
                          <td id="pontosColor">${time.saldoGols}</td>`;
        tbody.appendChild(tr);
      });
    }
  
    // Função para atualizar a tabela de resultados
    function atualizarTabelaResultados() {
      const tbody = document.querySelector("#tabela-resultados tbody");
      tbody.innerHTML = "";
    
      rodadas[rodadaAtual].forEach((jogo, index) => {
        const placarA = placares[rodadaAtual][index].placarA;
        const placarB = placares[rodadaAtual][index].placarB;
    
        // Encontre os objetos de time correspondentes pelos nomes dos times
        const timeA = tabelaClassificacao.find(time => time.time === jogo.timeA);
        const timeB = tabelaClassificacao.find(time => time.time === jogo.timeB);
    
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="time-info">
                          <img class="escudo" src="escudos/${jogo.timeA}.png" alt="${jogo.timeA}">
                          <span id="nomeColor">${timeA.nome}</span>
                        </td>
                        <td id="posColor">${placarA !== null ? placarA : '0'} - ${placarB !== null ? placarB : '0'}</td>
                        <td class="time-info">
                          <img class="escudo" src="escudos/${jogo.timeB}.png" alt="${jogo.timeB}">
                          <span id="nomeColor">${timeB.nome}</span>
                        </td>
                        <td id="posColor">${rodadaAtual + 1}</td>`;
        tbody.appendChild(tr);
      });
    }
  
    // Função para adicionar resultado de uma rodada específica
    function adicionarResultadoRodada(rodada, placaresRodada) {
        placares[rodada] = placaresRodada; // Definindo os placares da rodada
        placaresRodada.forEach((placar, index) => {
            const jogo = rodadas[rodada][index];
            if (!jogo) return;
        
            const placarA = placar.placarA;
            const placarB = placar.placarB;
        
            const spanPlacarA = document.getElementById(`placarA${index}`);
            const spanPlacarB = document.getElementById(`placarB${index}`);
        
            if (spanPlacarA && spanPlacarB) {
              if (placarA !== null && placarB !== null) {
                spanPlacarA.textContent = placarA;
                spanPlacarB.textContent = placarB;
              } else {
                // Se algum placar for null, tratamos como jogo não realizado
                spanPlacarA.textContent = '0';
                spanPlacarB.textContent = '0';
              }
            }
        
            const indexTimeA = tabelaClassificacao.findIndex(time => time.time === jogo.timeA);
            const indexTimeB = tabelaClassificacao.findIndex(time => time.time === jogo.timeB);
        
            // Verifica se o jogo foi realizado
            if (placarA !== null && placarB !== null) {
              tabelaClassificacao[indexTimeA].jogos++;
              tabelaClassificacao[indexTimeB].jogos++;
        
              tabelaClassificacao[indexTimeA].saldoGols += (placarA - placarB);
              tabelaClassificacao[indexTimeB].saldoGols += (placarB - placarA);
        
              if (placarA > placarB) {
                tabelaClassificacao[indexTimeA].pontos += 3;
              } else if (placarA < placarB) {
                tabelaClassificacao[indexTimeB].pontos += 3;
              } else {
                tabelaClassificacao[indexTimeA].pontos++;
                tabelaClassificacao[indexTimeB].pontos++;
              }
            }
          });
        
          // Atualiza a tabela de resultados
          atualizarTabelaResultados();
        
          // Ordena a tabela de classificação
          tabelaClassificacao.sort((a, b) => {
            if (a.pontos !== b.pontos) {
              return b.pontos - a.pontos;
            } else {
              return b.saldoGols - a.saldoGols;
            }
          });
        
          // Atualiza a posição dos times na tabela
          tabelaClassificacao.forEach((time, index) => {
            time.posicao = index + 1;
          });
        
          // Atualiza a tabela de classificação
          atualizarTabelaClassificacao();
    }
  
    function proximaRodada() {
        if (rodadaAtual < rodadas.length - 1) {
          rodadaAtual++;
          document.getElementById("numero-rodada").textContent = rodadaAtual + 1;
          atualizarTabelaResultados();
        }
    }
  
    // Função para voltar para a rodada anterior
    function rodadaAnterior() {
        if (rodadaAtual > 0) {
          rodadaAtual--;
          document.getElementById("numero-rodada").textContent = rodadaAtual + 1;
          atualizarTabelaResultados();
        }
    }
  
    // Event listener para o botão de rodada anterior
    document.getElementById("rodada-anterior").addEventListener("click", rodadaAnterior);
    
    // Exemplo de uso: avançando para a próxima rodada
    document.getElementById("proximo-rodada").addEventListener("click", proximaRodada);
    
    // Exemplo de uso: adicionando resultados para a primeira rodada
    adicionarResultadoRodada(0, [
        { placarA: 2, placarB: 0 },
        { placarA: 3, placarB: 0 },
        { placarA: 0, placarB: 0 },
        { placarA: 0, placarB: 2 },
        { placarA: 2, placarB: 0 },
        { placarA: 1, placarB: 2 },
        { placarA: 0, placarB: 1 },
        { placarA: 3, placarB: 1 },
        { placarA: 1, placarB: 2 },
        { placarA: 2, placarB: 0 },
        { placarA: 1, placarB: 1 },
        { placarA: 0, placarB: 1 }
    ]);
    
    // Exemplo de uso: adicionando resultados para a terceira rodada
    adicionarResultadoRodada(1, [
      { placarA: 5, placarB: 3 },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
    
    // Exemplo de uso: adicionando resultados para a quarta rodada
    adicionarResultadoRodada(2, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    // Exemplo de uso: adicionando resultados para a quinta rodada
    adicionarResultadoRodada(3, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(4, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(5, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(6, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(7, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(8, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(9, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  
    adicionarResultadoRodada(10, [
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null },
      { placarA: null, placarB: null }
    ]);
  });
  