import { Component, OnInit } from '@angular/core';
import { Dado } from 'src/app/clases/dado/dado';
import { DadosService } from 'src/app/servicios/dadosService/dados.service';

declare var window:any;

@Component({
  selector: 'app-generala-obligada',
  templateUrl: './generala-obligada.component.html',
  styleUrls: ['./generala-obligada.component.css']
})
export class GeneralaObligadaComponent implements OnInit {

  modal :any;
  inicio! : boolean;
  loading! : boolean;
  puntaje : number = 0;
  dados! : Array<any>;
  primerDado! : any;
  segundoDado! : any;
  tercerDado! : any;
  cuartoDado! : any;
  quintoDado! : any;
  dadosTirados! : Array<any>;
  indice: number = 0;
  esGenerala : boolean;

  constructor(
    private dadosServ : DadosService
  ) {
    this.loading = true;
    this.inicio = false;
    this.esGenerala = false;
    this.dados = new Array<any>();
    this.dadosTirados = new Array<any>();
  }

  ngOnInit(): void {
    this.dadosServ.obtenerDados().subscribe( resp => {
      resp.forEach( item => {
        let dadoAux = new Dado((item as any).valor, (item as any).imagen)
        this.dados.push(dadoAux);
      });
    });
    setTimeout(() =>{ this.loading= false; }, 400)
  }

  iniciarJuego(){
    this.inicio = true;
  }

  tirarDados(){
    let puntajetirada : number = 0;
    this.primerDado = this.dados[this.sortearDado()];
    this.segundoDado = this.dados[this.sortearDado()];
    this.tercerDado = this.dados[this.sortearDado()];
    this.cuartoDado = this.dados[this.sortearDado()];
    this.quintoDado = this.dados[this.sortearDado()];
    this.dadosTirados.push([this.primerDado , this.segundoDado, this.tercerDado, this.cuartoDado, this.quintoDado, {"puntaje":puntajetirada}])
    this.sumarPuntos(this.indice);
    this.indice++;
  }

  sortearDado() : number {
    return Math.floor(Math.random() * (this.dados.length));
  }

  sumarPuntos(indice:number){
    switch(indice){
      case 6:
        this.evaluarEscalera(indice);
        break;
      case 7:
        this.evaluarFull(indice);
        break;
      case 8:
        this.evaluarPoker(indice);
        break;
      case 9:
        this.evaluarGenerala(indice);
        break;
      case 10:
        this.evaluarGeneralaDoble(indice);
        break;
      default:
        this.evaluarTirada(indice)
      break;
    }
  }

  evaluarTirada(indice:number){
    let valor = indice + 1;
    let valorTirada : number = 0;
    this.dadosTirados[indice].forEach( (item: any) => {
      if((item as any).valor == valor){
        this.puntaje += Number(item.valor);
        valorTirada += Number(item.valor);
      }
    });
    this.dadosTirados[indice].puntaje = valorTirada;
  }

  evaluarEscalera(indice:number){
    let tirada = this.dadosTirados[indice];
    tirada.sort(this.ordenarPorValor);
    let valorTirada : number = 0;
    if(this.verificarEscalera(tirada)){
      this.puntaje += 20;
      valorTirada += 20;
    }
    this.dadosTirados[indice].puntaje = valorTirada;
  }

  evaluarFull(indice:number){
    let repeticiones = this.verificarRepeticiones(this.dadosTirados[indice]);
    let rep3 : boolean = false;
    let rep2 : boolean = false;
    let valorTirada : number = 0;
    repeticiones.forEach(item => {
      if(item.repeticiones == 3){
        rep3 = true;
      }
      if(item.repeticiones == 2){
        rep2 = true;
      }
    });

    if(rep2 && rep3){
      this.puntaje += 30;
      valorTirada += 30;
    }
    this.dadosTirados[indice].puntaje = valorTirada;
  }

  evaluarPoker(indice:number){
    let repeticiones = this.verificarRepeticiones(this.dadosTirados[indice]);
    let valorTirada : number = 0;
    repeticiones.forEach(item => {
      if(item.repeticiones == 4){
        this.puntaje += 40;
        valorTirada += 40;
      }
    });
    this.dadosTirados[indice].puntaje = valorTirada;
  }

  evaluarGenerala(indice:number){
    let repeticiones = this.verificarRepeticiones(this.dadosTirados[indice]);
    let valorTirada : number = 0;
    repeticiones.forEach(item => {
      if(item.repeticiones == 5){
        this.puntaje += 50;
        this.esGenerala = true;
        valorTirada += 50;
      }
    });
    this.dadosTirados[indice].puntaje = valorTirada;
  }

  evaluarGeneralaDoble(indice:number){
    let valorTirada : number = 0;
    if(this.esGenerala){
      let repeticiones = this.verificarRepeticiones(this.dadosTirados[indice]);
      repeticiones.forEach(item => {
        if(item.repeticiones == 5){
          this.puntaje += 100;
          valorTirada += 100;
        }
      });
    }
    this.dadosTirados[indice].puntaje = valorTirada;
    this.esGenerala = false;
    setTimeout(() =>{ this.reiniciarJuego(); },2000)
  }

  verificarRepeticiones(tirada : Array<Dado>): Array<any>{
    let repeticiones = this.dados;
    repeticiones.forEach(item => {
      item.repeticiones = 0
    });
    repeticiones.sort(this.ordenarPorValor);
    tirada.forEach(dado => {
      switch(dado.valor){
        case 1:
          repeticiones[0].repeticiones++;
        break;
        case 2:
          repeticiones[1].repeticiones++;
        break;
        case 3:
          repeticiones[2].repeticiones++;
        break;
        case 4:
          repeticiones[3].repeticiones++;
        break;
        case 5:
          repeticiones[4].repeticiones++;
        break;
        case 6:
          repeticiones[5].repeticiones++;
        break;
        default:
        break;
      }
    });
    return repeticiones;
  }

  ordenarPorValor(dado1: any, dado2: any) {
    if(dado1.valor < dado2.valor){
      return -1;
    }else if(dado1.valor > dado2.valor){
      return 1;
    }
    return 0;
  }

  verificarEscalera(tirada : Array<Dado>) : boolean{

    if(tirada[0].valor == 1 && tirada[1].valor == 2 && tirada[2].valor == 3 && tirada[3].valor == 4 && tirada[4].valor == 5){
      return true;
    }
    if(tirada[0].valor == 2 && tirada[1].valor == 3 && tirada[2].valor == 4 && tirada[3].valor == 5 && tirada[4].valor == 6){
      return true;
    }
    if(tirada[0].valor == 1 && tirada[1].valor == 3 && tirada[2].valor == 4 && tirada[3].valor == 5 && tirada[4].valor == 6){
      return true;
    }
    return false;
  }

  reiniciarJuego(){
    this.modal = document.getElementById('mensajeJuegoFinalizado');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(this.modal)
    modalBootstrap.show();
    setTimeout(() =>{ modalBootstrap.hide(); this.puntaje = 0; this.dadosTirados = new Array<any>(); this.inicio = false; this.indice = 0;},5000)
  }

  cerrarMensaje(){
    this.puntaje = 0; this.dadosTirados = new Array<any>(); this.inicio = false; this.indice = 0;
  }
}
