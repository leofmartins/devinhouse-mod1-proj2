interface Appointment {
  appointmentTime: string;
  dosageAndPrecaution: string;
  healthProblemDescription: string;
  prescriptionMedication?: string
  reasonOfAppointment: string
}

interface Exam {
  documentUrl?: string;
  examName: string;
  examTime: string;
  examType: string;
  labName: string;
  results: string;
}

export interface Person {
  id: string,
  seqId: string,
  address: {
    cep: string;
    city: string;
    compl?: string;
    district: string;
    houseNumber: string;
    pointOfReferece?: string;
    state: string;
    street: string;
  };
  allergyList?: string;
  appointment: Appointment[];
  birthTown: string;
  birthdate: string;
  cpf: string;
  email?: string;
  emergencyContact: string;
  exams: Exam[];
  gender: string;
  healthInsurance?: string;
  healthInsuranceExpirationDate?: string;
  healthInsuranceNumber?: string;
  maritalState: string;
  name: string;
  phoneNumber: string;
  rg: string;
  specialCaresList?: string;
}

export interface User {
  email: string;
  name: string;
  password: string;
}

export type People = Person[];