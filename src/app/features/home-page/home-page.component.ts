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
  getPeopleLength(): number {
    if (this.people) {
      return this.people.length;
    }
    return 0;
  }

  getAppointMentCount(): number {
    let numberOfAppointments = 0;
    this.people?.forEach(
      person => numberOfAppointments += person.appointment.length
    )
    return numberOfAppointments
  }

  getExamsCount(): number {
    let numberOfExams = 0;
    this.people?.forEach(
      person => numberOfExams += person.exams.length
    );
    return numberOfExams
  }
}