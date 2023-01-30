import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViaCep } from "@shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  private viaCepUrl = "https://viacep.com.br/ws/"

  constructor(private http: HttpClient) {
  }

  getAdress(cep: string) {
    return this.http.get<ViaCep>(`${this.viaCepUrl}/${cep}/json`);
  }
}
