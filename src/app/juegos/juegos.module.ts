import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegoHomeComponent } from './juego-home/juego-home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JuegoHomeComponent,
    AhorcadoComponent,
    MayorMenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JuegosModule { }
