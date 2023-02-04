import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from "rxjs";
import { People, Person } from "@shared/interfaces";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private peopleUrl = 'http://localhost:3000/people';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPeople(): Observable<People> {
    return this.http.get<People>(this.peopleUrl);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.peopleUrl}/id=${id}`)
  }

  addPerson(person: Person): any {
    this.http.post<Person>(this.peopleUrl, person)
      .subscribe(result => {
        console.log(result);
      });
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${ operation } failed: ${ error.message }`);

      return of(result as T);
    };
  }
}