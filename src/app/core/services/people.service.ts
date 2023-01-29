import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { People } from "@shared/interfaces";
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
}
