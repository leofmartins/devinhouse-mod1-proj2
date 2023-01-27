import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from "./features/add-people/add-people.component";
import { AddAppointmentComponent } from "./features/add-appointment/add-appointment.component";
import { AddExamComponent } from "./features/add-exam/add-exam.component";

const routes: Routes = [
  { path: 'add-people', component: AddPeopleComponent },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'add-exam', component: AddExamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
