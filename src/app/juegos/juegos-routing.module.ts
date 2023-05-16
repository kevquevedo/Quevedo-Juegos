import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoHomeComponent } from './juego-home/juego-home.component';
import { ErrorComponent } from '../components/error/error.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';

const routes: Routes = [
  {path:'', component: JuegoHomeComponent},
  {path:'ahorcado', component: AhorcadoComponent},
  {path:'mayormenor', component: MayorMenorComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
