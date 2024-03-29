export interface Appointment {
  id: number;
  personId: number;
  appointmentTime: string;
  appointmentDate: string;
  dosageAndPrecaution: string;
  healthProblemDescription: string;
  prescriptionMedication?: string;
  reasonOfAppointment: string;
}

export interface Exam {
  id: number;
  personId: number
  documentUrl?: string;
  examName: string;
  examTime: string;
  examType: string;
  labName: string;
  results: string;
}

export interface Person {
  id: number,
  address: {
    cep: string;
    town: string;
    compl?: string;
    district: string;
    houseNumber: string;
    pointOfReferece?: string;
    state: string;
    street: string;
  };
  allergies?: string;
  birthTown: Date;
  birthdate: string;
  cpf: string;
  email?: string;
  emergencyContact: string;
  gender: string;
  healthInsurance?: string;
  healthInsuranceExpiration?: Date;
  healthInsuranceNumber?: string;
  maritalStatus: string;
  name: string;
  phoneNumber: string;
  rg: string;
  specialCares?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

export type People = Person[];

export interface ViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string
}