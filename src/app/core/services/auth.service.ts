import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { People, User } from "@shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  isLoggedIn(): boolean {
    return false;
  }
  constructor(private http: HttpClient) { }

  checkUser(user: User) {
    this.http.get<User>(this.usersUrl)
      .subscribe(users => {
        console.log(users);
      })
  }

  addUser(name: string, email: string, password: string) {
    this.http.post<User>(this.usersUrl, {name: name, email: email, password: password})
  }

}