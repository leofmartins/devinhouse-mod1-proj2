import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'lab-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

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
    this.authService.authenticate(this.loginForm.value);
  }

  resetPassword() {
    this._snackBar.open(
      `Função ainda não implementada. Contate o suporte.`,
      'OK',
      { duration: 3000 }
    );
  }
}
