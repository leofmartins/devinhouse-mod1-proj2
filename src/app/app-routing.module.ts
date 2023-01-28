import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from "./features/add-people/add-people.component";
import { AddAppointmentComponent } from "./features/add-appointment/add-appointment.component";
import { AddExamComponent } from "./features/add-exam/add-exam.component";
import { ListPeopleComponent } from "./features/list-people/list-people.component";

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
