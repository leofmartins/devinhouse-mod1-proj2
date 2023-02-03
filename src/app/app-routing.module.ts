import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from "./features/add-people/add-people.component";
import { AddAppointmentComponent } from "./features/add-appointment/add-appointment.component";
import { AddExamComponent } from "./features/add-exam/add-exam.component";
import { ListPeopleComponent } from "./features/list-people/list-people.component";
import { HomePageComponent } from "./features/home-page/home-page.component";
import { LoginPageComponent } from "./features/login-page/login-page.component";
import { MenuComponent } from "./core/menu/menu.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { LoggedinGuard } from "./core/guards/loggedin.guard";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        title: 'LABMedical - Home Page'
      },
      {
        path: 'add-people',
        component: AddPeopleComponent,
        title: 'LABMedical - Cadastro de Paciente'
      },
      {
        path: 'add-appointment',
        component: AddAppointmentComponent,
        title: 'LABMedical - Cadastro de Consulta'
      },
      {
        path: 'add-exam',
        component: AddExamComponent,
        title: 'LABMEdical - Cadastro de Exame'
      },{
        path: 'list-people',
        component: ListPeopleComponent,
        title: 'LABMedical - Lista de Prontuários'
      },{
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },{
        path: 'edit/:id',
        component: AddPeopleComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoggedinGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
