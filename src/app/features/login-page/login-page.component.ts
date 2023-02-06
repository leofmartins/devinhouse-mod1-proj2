import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'lab-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        email: [null, Validators.compose([
          Validators.required, Validators.email
        ])],
        password: [null, Validators.compose([
          Validators.required, Validators.minLength(8)
        ])]
      })
  }

  login() {
    this.authService.checkUser(this.loginForm.value)
  }
}
