import { Component, OnInit } from '@angular/core';
import { Appointment, Exam, People } from "@shared/interfaces";
import { PeopleService } from "@services/people-service";

@Component({
  selector: 'lab-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  people: People | undefined;
  appointments: Appointment[] | undefined;
  exams: Exam[] | undefined;

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.peopleService.getPeople()
      .subscribe(
        persons => this.people = persons
      );

    this.peopleService.getAppointments()
      .subscribe(
        appointments => this.appointments = appointments
      );

    this.peopleService.getExams()
      .subscribe(
        exams => this.exams = exams
      );
  }
  getPeopleLength(): number {
    if (this.people) {
      return this.people.length;
    }
    return 0;
  }

  getAppointMentCount(): number {
    if (this.appointments) {
      return this.appointments.length;
    }
    return 0;
  }

  getExamsCount(): number {
    if (this.exams) {
      return this.exams.length;
    }
    return 0;
  }
}