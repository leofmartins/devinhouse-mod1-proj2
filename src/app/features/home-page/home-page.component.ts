import { Component } from '@angular/core';
import { People } from "../../shared/interfaces/interfaces";
import { DatabaseService } from "../../shared/services/database.service";

@Component({
  selector: 'lab-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  people: People = [];

  constructor(private databaseService: DatabaseService) {
    this.databaseService.getPeople()
      .subscribe(people => this.people = people);
  }
}