import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuarioService/usuario.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subUsuarios! : Subscription;
  mensajeError: string | undefined;
  mensajeOk!: boolean;
  loading! : boolean;
  spinner! : boolean;

  constructor(
    private auth: Auth,
    private router: Router,
    private uServ: UsuarioService
  ) {
    this.mensajeOk = false;
    this.loading = true;
    this.spinner = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl('', Validators.email),
      clave: new FormControl('', Validators.minLength(6)),
    });

    setTimeout(() =>{
      this.loading= false;
    },1000)
  }

  ngOnDestroy(): void {
    this.subUsuarios.unsubscribe();
  }

  get mail(){
    return this.form.get('mail');
  }

  get clave(){
    return this.form.get('clave');
  }

  loguearUsuario(){
    this.spinner= true;
    signInWithEmailAndPassword(this.auth, this.mail?.value, this.clave?.value)
    .then(respuesta => {
      this.spinner= false;
      this.uServ.actualizarLogUsuarios(respuesta.user.email!);
      this.uServ.loguearUsuario(respuesta.user.email!);
      this.router.navigateByUrl('');
    })
    .catch(error => {
      this.evaluarErrorLogin(error.code);
    })
  }

  evaluarErrorLogin(error : string){
    switch(error){

      case 'auth/invalid-email':
        this.mensajeError = "El email no se encuentra registrado."
        this.ocultarMensaje();
      break;

      case 'auth/wrong-password':
        this.mensajeError = "La contraseña es incorrecta."
        this.ocultarMensaje();
      break;

      case 'auth/missing-password':
        this.mensajeError = "Debe ingresar una contraseña."
        this.ocultarMensaje();
      break;

      default:
        this.mensajeError = "Ocurrió un error inesperado.";
        this.ocultarMensaje();
      break;
    }
  }

  log(usuario: string){

    switch(usuario){
      case 'Kevin':
        this.obtenerDatosUsuario('quevedo.kevin1994@gmail.com');
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'Augusto':
        this.obtenerDatosUsuario('afernandez@mail.com');
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      case 'Guido':
        this.obtenerDatosUsuario('g.gutierrez@mail.com');
        setTimeout(() =>{ this.loguearUsuario() }, 2000)
      break;

      default:
        this.limpiarInputs();
      break;
    }
  }

  obtenerDatosUsuario(email: string){
    this.spinner= true;
    this.subUsuarios = this.uServ.obtenerUsuarios().subscribe(mensaje =>{
      this.spinner= false;
      mensaje.forEach(usuario => {
        if((usuario as any).email == email){
          this.form.controls['mail'].setValue((usuario as any).email);
          this.form.controls['clave'].setValue((usuario as any).clave);
        }
      })
    })
  }

  limpiarInputs(){
    this.form.controls['mail'].setValue('');
    this.form.controls['clave'].setValue('');
  }

  ocultarMensaje(){
    setTimeout(() =>{ this.mensajeError = undefined },3000)
  }
}
