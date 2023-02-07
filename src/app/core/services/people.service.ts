import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Appointment, People, Person } from "@shared/interfaces";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private peopleUrl = 'http://localhost:3000/persons';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPeople(): Observable<People> {
    return this.http.get<People>(this.peopleUrl);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.peopleUrl}/${id}`)
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.peopleUrl, person, this.httpOptions);
  }

  editPerson(person: Person, id: string): Observable<Person> {
    return this.http.put<Person>(`${this.peopleUrl}/${id}`, person, this.httpOptions);
  }

  addAppointment(appointment: Appointment, id: string): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.peopleUrl}/${id}/appointments`, appointment, this.httpOptions);
  }

  deletePerson(id: string): Observable<Person> {
    return this.http.delete<Person>(`${this.peopleUrl}/${id}`, this.httpOptions);
  }
}