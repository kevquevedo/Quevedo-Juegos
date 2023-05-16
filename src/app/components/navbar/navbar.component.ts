import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuarioService/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  public usuarioRegistrado: string | undefined;
  subsUsuario!: Subscription;

  constructor(
    private uServ : UsuarioService,
    private auth : Auth
  ) { }

  ngOnInit(): void {
    this.subsUsuario = this.uServ.emailLogueado$.subscribe(email =>  {
      this.usuarioRegistrado = email;
    })
  }

  ngOnDestroy(): void{
    this.subsUsuario.unsubscribe();
  }

  cerrarSesion(){
    this.uServ.logOut();
    this.usuarioRegistrado = undefined;
  }


}
