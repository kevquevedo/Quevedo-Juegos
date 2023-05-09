import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, getDocs } from '@angular/fire/firestore';
import { DocumentData, QuerySnapshot, addDoc } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private emailLogueado: Subject<string>;
  public emailLogueado$: Observable<string>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.emailLogueado = new Subject();
    this.emailLogueado$ = this.emailLogueado.asObservable();
  }

  loguearUsuario(email:string){
    this.emailLogueado.next(email)
  }

  logOut(){
    this.auth.signOut();
  }

  actualizarLogUsuarios(email: string){
    let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    let hora =  formatDate(new Date(), 'HH:mm:ss', 'en-US')
    let log = {"email":email, "fecha":fecha, "hora":hora};
    let logsUsuariosRef = collection(this.firestore, 'logsUsuarios');
    addDoc(logsUsuariosRef, log)
  }

  obtenerUsuarios(): Observable<[]>{
    const usuarios = collection(this.firestore, 'usuarios')
    return collectionData(usuarios) as Observable<[]>
  }

  actualizarUsuarios(nombre:string, apellido:string, email:string, clave:string){
    let usuarioNuevo = {"nombre":nombre, "apellido":apellido, "email":email, "clave":clave}
    let usuariosRef = collection(this.firestore, 'usuarios');
    addDoc(usuariosRef, usuarioNuevo);
  }

}
