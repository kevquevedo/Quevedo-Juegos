import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, collection, getDocs } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Letras } from 'src/app/clases/letras/letras';
import { AhorcadoService } from 'src/app/servicios/ahorcadoService/ahorcado.service';

declare var window:any;

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  form!: FormGroup;
  modalTrigger :any;
  modal :any;
  loading! : boolean;

  public palabras!: Array<string>;
  public palabraFormateada!: Array<string>;
  public palabraSeleccionada!: Array<Letras>;
  public cantErrores!: number;
  palabraComparar! : string;

  constructor(
    private ahorServ: AhorcadoService
  ) {
    this.loading = true;
    this.palabras = new Array<string>();
    this.palabraSeleccionada = new Array<Letras>();
    this.cantErrores = 0;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      palabraArriesgada: new FormControl('', Validators.required),
    });
    this.ahorServ.obtenerPalabras().subscribe( respuesta =>{
      this.palabras = respuesta;
    });
    setTimeout(() =>{ this.loading= false;}, 400)
  }

  get palabraArriesgada(){
    return this.form.get('palabraArriesgada');
  }

  arriesgarPalabra(){
    if(this.palabraArriesgada?.value == this.palabraComparar){
      this.mensajeGanaste()
      this.palabraArriesgada?.reset();
    }else{
      this.mensajePerdiste();
      this.palabraArriesgada?.reset();
    }
  }

  elegirPalabra(){
    //Blanqueo el valor de la palabra Seleccionada y del dibujo del ahorcado
    this.cantErrores = 0;
    this.palabraSeleccionada = new Array<Letras>();
    //Elijo una palabra random
    let posicion = Math.floor(Math.random() * (this.palabras.length));
    this.palabraComparar = (this.palabras[posicion] as any).nombre;
    this.palabraFormateada = (this.palabras[posicion] as any).nombre.split('');
    //Casteo la palabra seleccionada
    this.palabraFormateada.forEach(valor => {
      let letra = new Letras(valor)
      this.palabraSeleccionada.push(letra)
    })
  }

  letraSeleccionada(letra : any){
    let contiene = false;
    this.palabraSeleccionada.forEach(item => {
      if((item as Letras).valor.toLowerCase() == letra.toLowerCase()){
        contiene = true;
      }
    })

    if(contiene){
      this.palabraSeleccionada.forEach(item =>{
        if((item as Letras).valor.toLowerCase() == letra.toLowerCase()){
          (item as Letras).visible = true;
        }
      })
      this.evaluarVictoria();
    }else{
      this.cantErrores++;
      this.evaluarCantErrores();
    }
  }

  evaluarCantErrores(){
    if(this.cantErrores == 4){ this.mensajePerdiste();}
  }

  evaluarVictoria(){
    let ganador = true;
    this.palabraSeleccionada.forEach(item =>{
      if((item as Letras).visible == false){
        ganador = false
      }
    })
    if(ganador){ this.mensajeGanaste();}
  }

  mensajePerdiste(){
    this.modal = document.getElementById('mensajePerdisteModal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(this.modal)
    modalBootstrap.show();
    setTimeout(() =>{ modalBootstrap.hide(); this.elegirPalabra(); },2000)
  }

  mensajeGanaste(){
    this.modal = document.getElementById('mensajeGanasteModal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(this.modal)
    modalBootstrap.show();
    setTimeout(() =>{ modalBootstrap.hide(); this.elegirPalabra(); },2000)
  }

}
