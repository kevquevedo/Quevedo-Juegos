import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../clases/usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  usuario!: Usuario;
  lista! : string | null;
  listaFinal! : any[];
  existe: boolean = false;
  mensajeError: boolean = false;
  mensajeOk: boolean = false;


  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      email: [null],
      clave: [null]
    });
  }

  ngOnInit(): void {
    this.lista = localStorage.getItem('usuarios')
  }

  validarUsuario(formulario: FormGroup){
    this.usuario = new Usuario(formulario.get('email')?.value, formulario.get('clave')?.value);
    this.buscarUsuario(this.usuario, formulario);
  }

  buscarUsuario(usuario:Usuario, formulario: FormGroup){

    if(this.lista != null){
      this.listaFinal = JSON.parse(this.lista);
      this.listaFinal.forEach(element => {

        if(usuario.email == element.nombre &&
           usuario.clave == element.clave){
            this.existe = true;
        }
      });
    }

    if(this.existe){
      this.mensajeOk = true;
      setTimeout(() =>{
        this.mensajeOk = false
      },3500)
    }else{
      this.mensajeError = true;
      setTimeout(() =>{
        this.mensajeError = false
      },3500)
    }

    this.limpiar(formulario);
  }

  limpiar(formulario: FormGroup){
    formulario.get('email')?.setValue("");
    formulario.get('clave')?.setValue("");
  }

}
