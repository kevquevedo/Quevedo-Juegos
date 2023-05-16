import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../servicios/usuarioService/usuario.service';
import { Subscription } from 'rxjs';

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toastTrigger :any;
  toast :any;

  constructor(
    private uServ : UsuarioService
  ) { }

  ngOnInit(): void {
    this.uServ.accesoChat.subscribe(resp => {
      this.mensaje()
    })
  }

  mensaje(){
    this.toast = document.getElementById('toast');
    const toastBootstrap = window.bootstrap.Toast.getOrCreateInstance(this.toast)
    toastBootstrap.show();
  }



}
