import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationStart, Router } from "@angular/router";

class NavigationEvent {
}

@Component({
  selector: 'lab-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pageTitle!: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentRoute!: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
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
    console.log(this.currentRoute);
    this.setTitle();
  }

  setTitle() {
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
