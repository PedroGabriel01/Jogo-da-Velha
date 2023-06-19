import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  emJogo = false;
  player1 = "Pedro";
  player2 = "Carol";
  vezDoPlayer : 1 | 2 = 1;
  tabuleiro = new Map<string,string>();
  partidaEncerrada = false;
  mostrandoModalJogadorVencedor = false;
  playerVencedor = "";
  salvarJogadores = true;
  listaJogadoresTop10 : any[] = [];

  ngOnInit(): void {
    this.obterJogadoresTop10();
  }

  async jogar() {
    this.resetarPartida();
    await this.salvarJogador(this.player1);
    await this.salvarJogador(this.player2);
    this.salvarJogadores = false;
    this.vezDoPlayer = 1;
    this.emJogo = true;
  }

  finalizar() {
    this.resetarPartida();
    this.obterJogadoresTop10();
    this.salvarJogadores = true;
    this.emJogo = false;
  }

  resetarPartida() {
    this.resetarTabuleiro();
    this.partidaEncerrada = false;
    this.mostrandoModalJogadorVencedor = false;
  }

  resetarTabuleiro() {
    this.tabuleiro.clear();
  }

  selecionarCelula(coordenada: string) {
    if (this.tabuleiro.has(coordenada) || this.partidaEncerrada) return;

    if (this.vezDoPlayer == 1) {
      this.tabuleiro.set(coordenada, this.player1);
      this.vezDoPlayer = 2;
    } else {
      this.tabuleiro.set(coordenada, this.player2);
      this.vezDoPlayer = 1;
    }

    this.verificarSeJogadorGanhou();
  }

  verificarSeJogadorGanhou() {
    let linhas = 3;
    let colunas = 3

    for (let x = 0; x < linhas; x ++) {
      if (this.tabuleiro.get(`0,${x}`) == this.tabuleiro.get(`1,${x}`) && this.tabuleiro.get(`1,${x}`) == this.tabuleiro.get(`2,${x}`)) {
        if (this.tabuleiro.get('0,'+ x)) {
          this.jogadorVenceu(this.tabuleiro.get('0,'+ x));
          return;
        }
      }
    }

    for (let x = 0; x < colunas; x ++) {
      if (this.tabuleiro.get(`${x},0`) == this.tabuleiro.get(`${x},1`) && this.tabuleiro.get(`${x},1`) == this.tabuleiro.get(`${x},2`)) {
        if (this.tabuleiro.get(x + ',0')) {
          this.jogadorVenceu(this.tabuleiro.get(x + ',0'));
          return;
        }
      }
    }

    if (this.tabuleiro.get("0,0") == this.tabuleiro.get("1,1") && this.tabuleiro.get("1,1") == this.tabuleiro.get("2,2")) {
      if (this.tabuleiro.get('0,0')) {
        this.jogadorVenceu(this.tabuleiro.get('0,0'));
        return;
      }
    }

    if (this.tabuleiro.get("2,0") == this.tabuleiro.get("1,1") && this.tabuleiro.get("1,1") == this.tabuleiro.get("0,2")) {
      if (this.tabuleiro.get('2,0')) {
        this.jogadorVenceu(this.tabuleiro.get('2,0'));
        return;
      }
    }
  }

  jogadorVenceu(playerVencedor?: string) {
    this.partidaEncerrada = true;
    console.log(`Jogador ${playerVencedor} venceu!`);
    this.mostrandoModalJogadorVencedor = true;
    this.playerVencedor = playerVencedor!;
    this.marcarVitoria();
  }

  async salvarJogador(nome: string) {
    if (!this.salvarJogadores) return;
    const usuario = { 'nome': nome};
    await fetch(`http://localhost:3000/jogadores`, {
      method: 'post',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(usuario)
    });
  }

  async obterTodosJogadores() {
    const res = await fetch(`http://localhost:3000/jogadores`);
    return await res.json();
  }

  async marcarVitoria() {
    const res = await fetch(`http://localhost:3000/jogadores/${this.playerVencedor}/marcarVitoria`, {
      method: 'put'
    });
    console.log(await res.json());
  }

  async obterJogadoresTop10() {
    const res = await fetch("http://localhost:3000/top10");
    this.listaJogadoresTop10 = await res.json();
  }
}
