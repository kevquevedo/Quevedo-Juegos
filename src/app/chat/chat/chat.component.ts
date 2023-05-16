import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuarioService/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public usuarioRegistrado: string | undefined;
  subsUsuarios!: Subscription;
  subsHistorialChat!: Subscription;
  listadoUsuarios! : any[];
  historialChat! : any[];
  mensaje! : string;
  email : string | undefined;
  loading! : boolean;

  constructor(
    private uServ : UsuarioService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {

    this.subsUsuarios = this.uServ.obtenerUsuarios().subscribe(respuesta =>{
      this.listadoUsuarios = respuesta;
    })

    this.subsHistorialChat = this.uServ.obtenerChatUsuarios().subscribe(respuesta =>{
      this.historialChat = respuesta;
      this.historialChat.sort(this.ordenarPorFechaYHora)
    })

    this.email = this.uServ.emailChat;
    setTimeout(() =>{ this.loading= false; }, 1000)
  }

  ngOnDestroy(): void{
    this.subsUsuarios.unsubscribe();
    this.subsHistorialChat.unsubscribe();
  }

  enviarMensaje(){

    if(this.mensaje != ''){
      this.listadoUsuarios.forEach(usuario => {
        if(this.uServ.emailChat == usuario.email){
          let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
          let hora =  formatDate(new Date(), 'HH:mm:ss', 'en-US')
          this.uServ.actualizarChatUsuarios(usuario.nombre, usuario.apellido, this.mensaje, hora, this.uServ.emailChat!, fecha);
          this.mensaje = ''
        }
      })
    }
  }

  //Ordena los comentarios por hora.
  ordenarPorFechaYHora(mensaje1: any, mensaje2: any) {

    if(mensaje1.fecha < mensaje2.fecha){
      return -1;
    }else if(mensaje1.fecha > mensaje2.fecha){
      return 1;
    }else if(mensaje1.fecha == mensaje2.fecha){
      if (mensaje1.hora < mensaje2.hora) {
        return -1;
      }
      if (mensaje1.hora > mensaje2.hora) {
        return 1;
      }
      return 0;
    }
    return 0;
  }
}
