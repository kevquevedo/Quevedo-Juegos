import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuarioService/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form!: FormGroup;
  mensajeError: string | undefined;
  loading! : boolean;

  constructor(
    private auth: Auth,
    private router: Router,
    private uServ: UsuarioService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'),Validators.required]),
      mail: new FormControl('', [Validators.email,Validators.required]),
      clave: new FormControl('', [Validators.minLength(6),Validators.required]),
      reingresoClave: new FormControl('', [Validators.minLength(6),Validators.required]),
    });

    setTimeout(() =>{
      this.loading= false;
    },1000)
  }

  get nombre(){
    return this.form.get('nombre');
  }

  get apellido(){
    return this.form.get('apellido');
  }

  get mail(){
    return this.form.get('mail');
  }

  get clave(){
    return this.form.get('clave');
  }

  get reingresoClave(){
    return this.form.get('reingresoClave');
  }

  crearUsuario(){
    if(this.evaluarErrorInputs()){
      createUserWithEmailAndPassword(this.auth, this.mail?.value, this.clave?.value)
      .then( respuesta => {
        this.uServ.actualizarUsuarios(this.nombre?.value, this.apellido?.value, this.mail?.value, this.clave?.value);
        this.uServ.actualizarLogUsuarios(this.mail?.value);
        this.uServ.loguearUsuario(this.mail?.value);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        this. evaluarErrorCWEAP(error.code);
      })
    }
  }

  evaluarErrorCWEAP(error:string){

    switch(error){
      case 'auth/email-already-in-use':
        this.mensajeError = "El email ya se encuentra registrado."
        this.ocultarMensaje();
      break;
      case 'auth/weak-password':
        this.mensajeError = "La contraseña es muy débil. Debe contener al menos 6 caracteres."
        this.ocultarMensaje();
      break;
      default:
        this.mensajeError = "Ocurrió un error inesperado."
        this.ocultarMensaje();
      break;
    }
  }

  evaluarErrorInputs() : boolean{

    if(!this.nombre?.valid){
      this.mensajeError = "El campo 'Nombre' no es válido."
      this.ocultarMensaje();
      return false;
    }
    if(!this.apellido?.valid){
      this.mensajeError = "El campo 'Apellido' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.mail?.valid){
      this.mensajeError = "El campo 'Email' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.clave?.valid){
      this.mensajeError = "El campo 'Contraseña' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(!this.reingresoClave?.valid){
      this.mensajeError = "El campo 'Reingrese Contraseña' no es válido."
      this.ocultarMensaje();
      return false;
    }
    else if(this.clave?.value != this.reingresoClave?.value){
      this.mensajeError = "Las contraseñas deben coincidir."
      this.ocultarMensaje();
      return false;
    }
    return true;
  }

  ocultarMensaje(){
    setTimeout(() =>{
      this.mensajeError = undefined
    },3000)
  }


}
