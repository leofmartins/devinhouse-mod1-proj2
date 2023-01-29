import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { People } from "../../shared/interfaces/interfaces";
import { PEOPLE } from "../../shared/mocks/database-mock";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor() { }

  getPeople(): Observable<People> {
    return of(PEOPLE);
  }
}
