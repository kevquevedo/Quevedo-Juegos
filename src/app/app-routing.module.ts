import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [

  {path:'', component: HomeComponent,
    children:
    [
      {path: '', component: BienvenidaComponent},
      {path: 'error', component: ErrorComponent}
    ]
  },
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
