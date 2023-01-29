import { Injectable } from '@angular/core';
import { PEOPLE } from "../mocks/database-mock";
import { Observable, of } from "rxjs";
import { People } from "src/app/shared/interfaces/interfaces";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getPeople(): Observable<People> {
    return of(PEOPLE);
  }
}
