import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { LogueadoGuard } from './guards/logueado.guard';

const routes: Routes = [

  {path:'home', component: HomeComponent,
    children:
    [
      {path: '', component: BienvenidaComponent},
      {path:'inicio', redirectTo: '/home', pathMatch:'full'},
      {path:'quien-soy', component: QuienSoyComponent},
      {path:'juegos', loadChildren: () => import('./juegos/juegos.module').then((m) => m.JuegosModule)},
      {path:'chat', loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule), canActivate:[LogueadoGuard]},
      {path:'login', component: LoginComponent,},
      {path:'registro', component:RegistroComponent}
    ]
  },
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
