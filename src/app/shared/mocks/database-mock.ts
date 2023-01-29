import { Person, User } from "src/app/shared/interfaces/interfaces";

export const PEOPLE: Person[] = [
  {
    "id": "31af5b68-3b50-4aea-8841-f6735ca01e08",
    "seqId": "0001",
    "address": {
      "cep": "88034040",
      "city": "Florianópolis",
      "compl": "Ap 302 A",
      "district": "Itacorubi",
      "houseNumber": "295",
      "state": "SC",
      "street": "Rua Acelon Pacheco da Costa"
    },

    "appointment": [{
      "appointmentTime": "2023-01-28",
      "dosageAndPrecaution": "Tomar 1 comprimido por dia",
      "healthProblemDescription": "Rinite alérgica",
      "prescriptionMedication": "Loratadina",
      "reasonOfAppointment": "Spirros"
    }],
    "birthTown": "Goioerê/PR",
    "birthdate": "1983-12-26",
    "cpf": "04810930955",
    "email": "leonardo.f.martins@icloud.com",
    "emergencyContact": "48999809090",
    "exams": [{
      "documentUrl": "https://somewhere.com",
      "examName": "Hemogrma Completo",
      "examTime": "2023-01-15",
      "examType": "Hemograma",
      "labName": "Laboratório Santa Luzia",
      "results": "Normal"
    }],
    "gender": "Masculino",
    "healthInsurance": "Unimed",
    "healthInsuranceExpirationDate": "2023-06-30",
    "healthInsuranceNumber": "123456",
    "maritalState": "Casado(a)",
    "name": "Leonardo da Fonseca Martins",
    "phoneNumber": "48996009454",
    "rg": "92656195 SSP/PR",
    "specialCaresList": "rinite"
  }, {
    "id": "b4960d68-b041-47c4-915f-f17ce947c573",
    "seqId": "0002",
    "address": {
      "cep": "88034040",
      "city": "Florianópolis",
      "district": "Itacorubi",
      "compl": "Ap 302 A",
      "houseNumber": "295",
      "state": "SC",
      "street": "Rua Acelon Pacheco da Costa"
    },
    "allergyList": "Diclofenaco",
    "appointment": [{
      "appointmentTime": "2023-01-27",
      "dosageAndPrecaution": "Tomar 1 comprimido por dia",
      "healthProblemDescription": "Rinite alérgica",
      "prescriptionMedication": "Loratadina",
      "reasonOfAppointment": "Spirros"
    }],
    "birthTown": "São João de Meriti/RJ",
    "birthdate": "1969-02-27",
    "cpf": "73589446900",
    "emergencyContact": "48996009454",
    "exams": [{
      "documentUrl": "https://somewhere.com",
      "examName": "Hemogrma Completo",
      "examTime": "2023-01-24",
      "examType": "Hemograma",
      "labName": "Laboratório Santa Luzia",
      "results": "Normal"
    }],
    "gender": "Masculino",
    "healthInsurance": "Unimed",
    "healthInsuranceExpirationDate": "2023-06-30",
    "healthInsuranceNumber": "654321",
    "maritalState": "Casado(a)",
    "name": "Sandra Regina Tatero Maia Martins",
    "phoneNumber": "48999809090",
    "rg": "34572984 SSP/SC",
    "specialCaresList": "rinite"
  }
];

export const USERS: User[] = [
  {
    "email": "leonardo.f.martins@icloud.com",
    "name": "Leonardo da Fonseca Martins",
    "password": "123456"
  }
]

export let lastSequencialIDRegistered: string;
lastSequencialIDRegistered = '2';