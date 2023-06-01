import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/servicios/preguntasService/preguntas.service';

declare var window:any;

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  modal :any;
  loading! : boolean;
  preguntas! : Array<any>;
  preguntaElegida! : any;
  puntaje : number = 0;

  constructor(
    private pregServ : PreguntasService
  ) {
    this.loading = true;
    this.preguntas = new Array<any>();
  }

  ngOnInit(): void {
    this.pregServ.obtenerPreguntas().subscribe( resp => {
      this.preguntas = resp;
    });
    setTimeout(() =>{ this.loading= false;}, 400)
  }

  elegirPreguntaInicial(){
    let posicion = Math.floor(Math.random() * (this.preguntas.length));
    this.preguntaElegida = this.preguntas[posicion];
  }

  elegirNuevaPregunta(pregunta : any){
    this.preguntas = this.preguntas.filter( item => item != pregunta);
    let posicion = Math.floor(Math.random() * (this.preguntas.length));
    this.preguntaElegida = this.preguntas[posicion];
  }

  elegirRespuesta(respuesta : any){
    switch(respuesta.esCorrecta){
      case true:
        this.mensajeGanaste();
        break;
      case false:
        this.mensajePerdiste();
        break;
      default:
      break;
    }
  }

  mensajePerdiste(){
    this.modal = document.getElementById('mensajePerdisteModal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(this.modal)
    modalBootstrap.show();
    setTimeout(() =>{ modalBootstrap.hide();
      this.puntaje = 0;
      this.preguntaElegida = undefined;
    },1500)
  }

  mensajeGanaste(){
    setTimeout(() =>{
      this.puntaje++;
      this.elegirNuevaPregunta(this.preguntaElegida);
    },700)
  }


}
