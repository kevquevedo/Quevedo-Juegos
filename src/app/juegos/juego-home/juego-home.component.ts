import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego-home',
  templateUrl: './juego-home.component.html',
  styleUrls: ['./juego-home.component.css']
})
export class JuegoHomeComponent implements OnInit {

  loading! : boolean;

  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {
    setTimeout(() =>{
      this.loading= false;
    },400)
  }

}
