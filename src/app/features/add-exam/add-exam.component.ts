import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'lab-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent {
  addExamForm = this.fb.group({
    examName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(68)
      ]
    )],
    examDate: [
      null,
      Validators.required],
    examTime: [
      null,
      Validators.required],
    examType: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])],
    labName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ])],
    reportUrl: [null],
    results: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024)
    ])]
  });

  constructor(private fb: FormBuilder) { }
}
