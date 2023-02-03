import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loading = true;
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

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViacepService,
    private rout: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.rout.snapshot.params['id'];
    this.addPeopleForm = this.fb.group({
      allergies: [null],
      birthTown: [null, Validators.required],
      birthdate: [null, Validators.required],
      city: [null, Validators.required],
      complement: [null],
      cpf: [null, Validators.required],
      editToggle: ['false', Validators.required],
      email: [null, Validators.compose([
        Validators.required, Validators.email
      ])],
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
      town: [null, Validators.required]
    });

    this.title = "Preencha os campos para cadastrar";

    if (this.id) {
      this.title = `Editando o cadastro de [Fulano]`;
    }

  }

  onSubmit(): void {
    alert('Thanks!');
  }

  getAdressFromViaCep(cep: string) {
    if (cep !== "") {
      let validateCep = /^[0-9]{8}$/;
      if (validateCep.test(cep)) {
        this.viaCepService.getAdress(cep)
          .subscribe(adress => this.address = adress);
      }
    }
  }
}
