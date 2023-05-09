import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {

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
