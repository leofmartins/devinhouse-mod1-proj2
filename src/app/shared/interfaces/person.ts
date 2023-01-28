export interface Person {
  address: {
    cep: string;
    city: string;
    compl: string;
    district: string;
    houseNumber: string;
    pointOfReferece: string;
    state: string;
    street: string;
  };
  allergyList: string;
  birthTown: string;
  birthdate: Date;
  cpf: string;
  email: string;
  emergencyContact: string;
  gender: string;
  healthInsurance: string;
  healthInsuranceExpirationDate: Date;
  healthInsuranceNumber: string;
  maritalState: string;
  name: string;
  phoneNumber: string;
  rg: string;
  specialCaresList: string
}