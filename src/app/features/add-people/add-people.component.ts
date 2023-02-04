import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViacepService } from "./services/viacep.service";
import { ViaCep } from "@shared/interfaces";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'lab-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {
  addPeopleForm!: FormGroup;
  id?: string;
  title!: string;
  editing = false;
  loading = false;
  submmited = false;
  submmiting = false;

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

  ) {
    this.today = new Date();
  }

  ngOnInit() {
    this.id = this.rout.snapshot.params['id'];
    this.addPeopleForm = this.fb.group({
      allergies: [null],
      birthTown: [null, Validators.required],
      birthday: [null, Validators.required],
      complement: [null],
      cpf: ['', Validators.compose([
        Validators.required,
        ValidateCPF
      ])],
      email: [null, Validators.email],
      emergencyContact: [null, Validators.required],
      gender: [null, Validators.required],
      healthCareNumber: [null],
      healthInsurance: [null],
      houseNumber: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      name: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(64)
      ])],
      neighborhood: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      postalCode: [null, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.maxLength(8)])
      ],
      reference: [null],
      rg: [null, Validators.compose([
        Validators.required, Validators.maxLength(20)
      ])],
      specialCares: [null],
      state: [null, Validators.required],
      street: [null, Validators.required],
      town: [null, Validators.required],
      healthCareValidate: [null]
    });

    this.title = "Preencha os campos para cadastrar";

    if (this.id) {
      this.title = `Editando o cadastro de [Fulano]`;
      this.editing = true;
    }
  }

  onSubmit(): void {
    console.log(this.addPeopleForm.value, this.addPeopleForm.invalid)
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
              town: adress.localidade,
              state: adress.uf,
              street: adress.logradouro,
              neighborhood: adress.bairro
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