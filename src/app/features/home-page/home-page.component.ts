import { Component, OnInit } from '@angular/core';
import { People } from "@shared/interfaces";
import { PeopleService } from "@services/people-service";

@Component({
  selector: 'lab-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  people: People = [];

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.peopleService.getPeople()
      .subscribe(people => this.people = people);
  }
}