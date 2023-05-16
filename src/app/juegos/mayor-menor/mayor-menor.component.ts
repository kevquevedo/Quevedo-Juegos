import { Component, OnInit } from '@angular/core';
import { Cartas } from 'src/app/clases/cartas/cartas';
import { CartasService } from 'src/app/servicios/cartasService/cartas.service';

declare var window:any;

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  modalTrigger :any;
  modal :any;
  loading! : boolean;

  existeNuevaCarta : boolean = false;
  nombreDeMazo!: string;
  ultimaCarta! : Cartas;
  nuevaCarta! : Cartas;
  puntaje : number = 0;

  constructor(private cartasService : CartasService) {
    this.loading = true;
    this.cartasService.crearMazo();
    this.ultimaCarta = new Cartas('', '');
    this.nuevaCarta = new Cartas('', '');
  }

  ngOnInit(): void {
    this.cartasService.ultimaCarta.subscribe( respuesta => {
      this.ultimaCarta = new Cartas( (respuesta as any).value, (respuesta as any).image )
    })
    this.cartasService.nuevaCarta.subscribe( respuesta => {
      this.nuevaCarta = new Cartas( (respuesta as any).value, (respuesta as any).image )
    })
    setTimeout(() =>{ this.loading= false;}, 400)
  }

  sacarNuevaCarta(parametro: string){
    this.nombreDeMazo = this.cartasService.nombreMazo;
    this.existeNuevaCarta = true;
    this.validarTamaño(this.ultimaCarta, this.nuevaCarta, parametro)
  }

  validarTamaño(carta1 : Cartas, carta2: Cartas, parametro: string){
    //Comparo el valor de las cartas
    let comparacion: string = "igual";
    if(parseInt(carta2.valor) > parseInt(carta1.valor)){
      comparacion = "mayor"
    }else if(parseInt(carta2.valor) < parseInt(carta1.valor)){
      comparacion = "menor"
    }
    //Comparo el resultado del valor de las cartas con lo que ingresó el usuario.
    if(parametro == comparacion){
      this.mensajeGanaste();
    }else{
      this.mensajePerdiste();
    }
  }

  mensajePerdiste(){
    this.modal = document.getElementById('mensajePerdisteModal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(this.modal)
    modalBootstrap.show();
    setTimeout(() =>{ modalBootstrap.hide();
      this.puntaje = 0;
      this.existeNuevaCarta = false;
      this.cartasService.crearMazo();
    },2000)
  }

  mensajeGanaste(){
    setTimeout(() =>{
      this.puntaje++;
      this.existeNuevaCarta = false;
      this.ultimaCarta = this.nuevaCarta;
      this.cartasService.obtenerCarta(this.nombreDeMazo)
    },1000)
  }

}
