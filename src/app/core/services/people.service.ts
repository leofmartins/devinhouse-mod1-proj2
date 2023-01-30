import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { People, Person } from "@shared/interfaces";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private peopleUrl = 'http://localhost:3000/people';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<People> {
    return this.http.get<People>(this.peopleUrl);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.peopleUrl}/id=${id}`)
  }

}
