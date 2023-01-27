import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'lab-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  addAppointmentForm = this.fb.group({
    subject: [null, Validators.compose([
      Validators.required, Validators.minLength(8), Validators.maxLength(64)
    ])],
    date: [null, Validators.required],
    time: [null, Validators.required],
    description: [null, Validators.compose([
      Validators.required, Validators.minLength(16), Validators.maxLength(1024)
    ])],
    medication: null,
    precaution: [null, Validators.compose([
      Validators.required, Validators.minLength(16), Validators.maxLength(256)
    ])]
  });
  constructor(private fb: FormBuilder) { }
}
