import { Component, OnInit } from '@angular/core';
import { People } from "@shared/interfaces";
import { PeopleService } from "@services/people-service";

@Component({
  selector: 'lab-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  people: People | undefined;

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.peopleService.getPeople()
      .subscribe(
        people => this.people = people
      );
  }
  getPeopleLength(): number | null {
    if (this.people) {
      return this.people.length;
    }
    return null;
  }

  getAppointMentCount(): number | null {
    let numberOfAppointments = 0;
    this.people?.forEach(
      person => numberOfAppointments += person.appointment?.length
    )
    return numberOfAppointments || null
  }

  getExamsCount(): number | null {
    let numberOfExams = 0;
    this.people?.forEach(
      person => numberOfExams += person.exams?.length
    );
    return numberOfExams || null
  }
}