import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UsuarioService } from '../servicios/usuarioService/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate, OnInit {

  private emailLogueado: Subject<string>;
  public emailLogueado$: Observable<string>;

  constructor(
    private uServ : UsuarioService
  ){
    this.emailLogueado = new Subject();
    this.emailLogueado$ = this.emailLogueado.asObservable();
  }

  ngOnInit(): void {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.uServ.estaRegistrado()){
      this.uServ.activarMensajeChat();
    }

    return this.uServ.estaRegistrado()
  }

}
