import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "@shared/interfaces";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  isLoggedIn(): boolean {
    return !!localStorage.getItem("userLogged");
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  authenticate(user: User) {
    this.http.get<User[]>(this.usersUrl)
      .subscribe(users => {
        const userFinded = users.find(x => x.email === user.email && x.password === user.password);
        if(userFinded) {
          localStorage.setItem("userLogged", userFinded.name);
          this.router.navigateByUrl('/home');
        } else {
          this._snackBar.open(
            'E-mail ou senha inválidos.',
            'OK',
            { duration: 3000 }
          );
        }
      })
  }

  addUser(name: string, email: string, password: string) {
    this.http.post<User>(this.usersUrl, {name: name, email: email, password: password})
  }

}