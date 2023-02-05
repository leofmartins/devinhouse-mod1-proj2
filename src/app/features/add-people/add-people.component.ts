import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViacepService } from "./services/viacep.service";
import { ViaCep } from "@shared/interfaces";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { PeopleService } from "@services/people-service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmDeleteComponent } from "./components/confirm-delete/confirm-delete.component";

@Component({
  selector: 'lab-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {
  addPeopleForm!: FormGroup;
  id!: string;
  title!: string;
  editing = false;
  loading = false;
  genders = ['Masculino', 'Feminino'];

  maritalStatus = [
    'Solteiro(a)',
    'Casado(a)',
    'Divorciado(a)',
    'Separado(a) judicialmente',
    'Viúvo(a)'
  ]

  address: ViaCep = {
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: ""
  }

  today!: Date;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViacepService,
    private rout: ActivatedRoute,
    public dialog: MatDialog,
    private peopleService: PeopleService,
    private router: Router,
    private _snackBar: MatSnackBar

  ) {
    this.today = new Date();
  }

  ngOnInit() {
    this.id = this.rout.snapshot.params['id'];

    this.addPeopleForm = this.fb.group({
      address: this.fb.group({
        cep: [null, Validators.compose([
          Validators.required, Validators.minLength(8), Validators.maxLength(8)])
        ],
        state: [null, Validators.required],
        street: [null, Validators.required],
        houseNumber: [null, Validators.required],
        town: [null, Validators.required],
        compl: [null],
        district: [null, Validators.required],
        pointOfReference: [null]
      }),
      allergies: [null],
      birthTown: [null, Validators.required],
      birthdate: [null, Validators.required],
      cpf: ['', Validators.compose([
        Validators.required,
        ValidateCPF
      ])],
      email: [null, Validators.email],
      emergencyContact: [null, Validators.required],
      gender: [null, Validators.required],
      healthInsuranceNumber: [null],
      healthInsurance: [null],
      maritalStatus: [null, Validators.required],
      name: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(64)
      ])],
      phoneNumber: [null, Validators.required],
      rg: [null, Validators.compose([
        Validators.required, Validators.maxLength(20)
      ])],
      specialCares: [null],
      healthInsuranceExpiration: [null]
    });

    if (this.id) {
      this.peopleService.getPerson(this.id)
        .subscribe(person => {
          this.addPeopleForm.patchValue(person);
          this.title = `Editando o cadastro de ${person.name}`;
        })
      this.editing = true;
    } else {
      this.title = "Preencha os campos para cadastrar";
    }
  }

  openConfirmDiaglog(): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { ...this.addPeopleForm.value}
    });

    confirmDialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.onSubmit();
        }
      });
  }

  onSubmit(): void {
    if (!this.editing) {
      this.peopleService.addPerson(this.addPeopleForm.value)
        .subscribe(newPerson => {
          this._snackBar.open(
            `${newPerson.name} adiconado com sucesso.`,
            'OK',
            { duration: 3000 }
          );
          this.router.navigateByUrl('/home');
        })
    } else {
      this.peopleService.editPerson(this.addPeopleForm.value, this.id)
        .subscribe(editedPerson => {
          this._snackBar.open(
            `Dados de ${editedPerson.name} editado com sucesso.`,
            'OK',
            { duration: 3000 }
          );
          this.router.navigateByUrl('/home');
        })
    }
  }

  deletePerson() {
    this.peopleService.getPerson(this.id)
      .subscribe(person => {
        if (person.exams || person.appointment) {
          alert('pessos possui exame ou consulta');
        } else {
          const confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: { ...this.addPeopleForm.value}
          });
          confirmDeleteDialogRef.afterClosed()
            .subscribe(result => {
              if (result) {
                this.peopleService.deletePerson(person.id)
                  .subscribe(() => {
                    this._snackBar.open(
                      `Cadastro excluído com sucesso.`,
                      'OK',
                      { duration: 3000 }
                    )
                    this.router.navigateByUrl('/home');
                  })
              }
            });
        }
      })
  }

  getAdressFromViaCep(cep: string) {
    if (cep !== "") {
      cep = cep.replace(/\D+/g,'')
      let validateCep = /^[0-9]{8}$/;
      if (validateCep.test(cep)) {
        this.viaCepService.getAdress(cep)
          .subscribe(adress => {
            this.address = adress
            this.addPeopleForm.patchValue({
              address: {
                town: adress.localidade,
                state: adress.uf,
                street: adress.logradouro,
                district: adress.bairro
              }
            })
          });
      }
    }
  }
}

function ValidateCPF(control: AbstractControl): { [s: string]: boolean } | null {
  if (!control) {
    return { isValidCPF: false };
  }
  const cpf = control.value.replace(/\D+/g,'');
  if (cpf.length !== 11) {
    return { isValidCPF: false };
  }
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return { isValidCPF: false };
  }
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return { isValidCPF: false };
  }
  return null;
}