import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Appointment, Exam, People, Person } from "@shared/interfaces";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { A } from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private personUrl = 'http://localhost:3000/persons';
  private appointmentUrl = 'http://localhost:3000/appointments';
  private examUrl = 'http://localhost:3000/exams';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPeople(): Observable<People> {
    return this.http.get<People>(this.personUrl);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentUrl)
  }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examUrl)
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personUrl}/${id}`)
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personUrl, person, this.httpOptions);
  }

  editPerson(person: Person, id: number): Observable<Person> {
    return this.http.put<Person>(`${this.personUrl}/${id}`, person, this.httpOptions);
  }

  addAppointment(appointment: Appointment, id: number): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.personUrl}/${id}/appointments`, appointment, this.httpOptions);
  }

  deletePerson(id: number): Observable<Person> {
    return this.http.delete<Person>(`${this.personUrl}/${id}`, this.httpOptions);
  }
}