import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from "./feature/add-people/add-people.component";

const routes: Routes = [{ path: 'add', component: AddPeopleComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
