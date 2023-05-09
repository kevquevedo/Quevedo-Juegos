import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoHomeComponent } from './juego-home/juego-home.component';
import { ErrorComponent } from '../components/error/error.component';

const routes: Routes = [
  {path:'', component: JuegoHomeComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
