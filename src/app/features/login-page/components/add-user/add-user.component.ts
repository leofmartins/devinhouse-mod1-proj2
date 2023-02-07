import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../add-people/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'lab-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  submiting = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      name: new FormControl ('', Validators.required),
      email: new FormControl ('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl ('', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])),
      passwordConfirmation: new FormControl('', Validators.required)
    },
      [MatchValidator('password', 'passwordConfirmation')]
    );
  }

  createAccount() {
    if(this.addUserForm.valid) {
      this.submiting = true;
      this.authService.addUser(this.addUserForm.value)
        .subscribe(newUserAdded => {
          this._snackBar.open(
            `Cadastro de ${newUserAdded.name} criado com sucesso.`,
            'OK',
            { duration: 3000 }
          );
          this.submiting = false;
          this.dialogRef.close();
        })
    }
  }
}

function MatchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);

    return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
      ? { mismatch: true }
      : null;
  };
}