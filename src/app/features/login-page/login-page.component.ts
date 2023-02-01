import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'lab-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required, Validators.email
    ])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8)
    ])]
  })
  constructor(private fb: FormBuilder) {
  }
}
