import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationStart, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

class NavigationEvent {
}

@Component({
  selector: 'lab-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pageTitle!: string;

  userLogged!: string | null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentRoute!: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.currentRoute = event.url
          this.setTitle();
        }
      }
    );
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.setTitle();
    this.userLogged = localStorage.getItem("userLogged");
  }

  setTitle() {
    if (this.currentRoute.includes('edit')) {
      this.pageTitle = 'EDIÇÃO DE PACIENTE'
    } else {
      switch (this.currentRoute) {
        case '/home':
          this.pageTitle = 'ESTATÍSTICAS E INFORMAÇÕES';
          break;
        case '/add-people':
          this.pageTitle = 'CADASTRO DE PACIENTE';
          break;
        case '/list-people':
          this.pageTitle = 'LISTAGEM DE PRONTUÁRIOS';
          break;
        case '/add-appointment':
          this.pageTitle = 'CADASTRO DE CONSULTA';
          break;
        case '/add-exam':
          this.pageTitle = 'CADASTRO DE EXAME';
          break;
        default:
          this.pageTitle = 'MENU'
      }
    }
  }

  logout() {
    localStorage.removeItem('userLogged');
    this.router.navigateByUrl('/login');
  }

  accountingSettings() {
    this._snackBar.open(
      `Função ainda não implementada. Contate o suporte.`,
      'OK',
      { duration: 3000 }
    );
  }
}
