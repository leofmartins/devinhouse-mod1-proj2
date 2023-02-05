import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable, startWith } from "rxjs";
import { People, Person } from "@shared/interfaces";
import { PeopleService } from "@services/people-service";
import { map } from "rxjs/operators";

@Component({
  selector: 'lab-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  addAppointmentForm = this.fb.group({
    appointment: this.fb.group({
      reasonOfAppointment: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(64)
      ])],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      healthProblemDescription: ['', Validators.compose([
        Validators.required, Validators.minLength(16), Validators.maxLength(1024)
      ])],
      prescriptionMedication: '',
      dosageAndPrecaution: ['', Validators.compose([
        Validators.required, Validators.minLength(16), Validators.maxLength(256)
      ])]
    })
  });

  people: People = [];
  selectedPerson!: Person;
  personCtrl = new FormControl('');
  filteredPeople!: Observable<People>;
  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService
    ) {
    this.peopleService.getPeople()
      .subscribe(people => this.people = people);
  }

  private _filteredPeople(value: string): People {
    const filterValue = value.toLowerCase();
    return this.people.filter(person => person.name.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    this.filteredPeople = this.personCtrl.valueChanges.pipe(
      startWith(''),
      map(person => (person? this._filteredPeople(person) : this.people.slice()))
    )
  }

  getAppointment(id: string) {
    console.log(id);
    this.peopleService.getPerson(id)
      .subscribe((person) => {
        this.selectedPerson = person;
        console.log(person);
        if (person.appointment) {
          this.addAppointmentForm.patchValue({
            appointment: {
              reasonOfAppointment: person.appointment.reasonOfAppointment,
              appointmentDate: person.appointment.appointmentDate,
              appointmentTime: person.appointment.appointmentTime,
              healthProblemDescription: person.appointment.healthProblemDescription,
              prescriptionMedication: person.appointment.prescriptionMedication,
              dosageAndPrecaution: person.appointment.dosageAndPrecaution
            }
          })
        }
      });
  }
  updateAppointmentPerson(person: Person, id: number) {
    // this.peopleService.editPerson(this.addAppointmentForm.value, this.selectedPerson.id)
    //   .subscribe(() => {})
  }
}
