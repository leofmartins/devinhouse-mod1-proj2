import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, startWith } from "rxjs";
import { People, Person } from "@shared/interfaces";
import { PeopleService } from "@services/people-service";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'lab-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  addAppointmentForm!: FormGroup;

  people: People = [];
  selectedPerson!: Person;
  personCtrl = new FormControl('');
  filteredPeople!: Observable<People>;
  submiting = false;
  loading = false;

  editting!: boolean;

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) {
    this.peopleService.getPeople()
      .subscribe(people => this.people = people);
  }

  private _filteredPeople(value: string): People {
    const filterValue = value.toLowerCase();
    return this.people.filter(person => person.name.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    this.addAppointmentForm = this.fb.group({
      // appointment: this.fb.group({
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

    this.filteredPeople = this.personCtrl.valueChanges.pipe(
      startWith(''),
      map(person => (person? this._filteredPeople(person) : this.people.slice()))
    )
  }

  getAppointment(id: string) {
    this.loading = true;
    this.peopleService.getPerson(id)
      .subscribe((person) => {
        this.selectedPerson = person;
        console.log(person.id);
        if (person.appointment) {
          this.addAppointmentForm.patchValue({
              reasonOfAppointment: person.appointment.reasonOfAppointment,
              appointmentDate: person.appointment.appointmentDate,
              appointmentTime: person.appointment.appointmentTime,
              healthProblemDescription: person.appointment.healthProblemDescription,
              prescriptionMedication: person.appointment.prescriptionMedication,
              dosageAndPrecaution: person.appointment.dosageAndPrecaution
          })
        }
        this.loading = false;
      });
  }
  updateAppointmentPerson() {
    this.selectedPerson.appointment = this.addAppointmentForm.value;
    this.peopleService.editPerson(this.selectedPerson, this.selectedPerson.id)
      .subscribe(editedPerson => {
        this._snackBar.open(
          `Consulta de ${editedPerson.name} cadastrada com sucesso.`,
          'OK',
          { duration: 3000 }
        );
        this.submiting = false;
        this.router.navigateByUrl('/home');
      })
  }

  deleteAppointmentPerson() {
    this.addAppointmentForm.reset();
    this.selectedPerson.appointment = this.addAppointmentForm.value;
    this.peopleService.editPerson(this.selectedPerson, this.selectedPerson.id)
      .subscribe(editedPerson => {
        this._snackBar.open(
          `Consulta de ${editedPerson.name} excluída com sucesso.`,
          'OK',
          { duration: 3000 }
        );
        this.submiting = false;
        this.router.navigateByUrl('/home');
      })
  }
}
