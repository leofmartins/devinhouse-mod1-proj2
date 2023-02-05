import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { registerLocaleData } from "@angular/common";
import localePT from "@angular/common/locales/pt";

import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MenuComponent } from './core/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddPeopleComponent } from './features/add-people/add-people.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { AddAppointmentComponent } from './features/add-appointment/add-appointment.component';
import { AddExamComponent } from './features/add-exam/add-exam.component';
import { ListPeopleComponent } from './features/list-people/list-people.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { HomePageComponent } from './features/home-page/home-page.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoginPageComponent } from './features/login-page/login-page.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { ConfirmDialogComponent } from './features/add-people/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CpfPipe } from './features/add-people/pipes/cpf.pipe';
import { PhonePipe } from './features/add-people/pipes/phone.pipe';
import { CepPipe } from './features/add-people/pipes/cep.pipe';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AgePipe } from './features/home-page/pipes/age.pipe';
import { ConfirmDeleteComponent } from './features/add-people/components/confirm-delete/confirm-delete.component';


registerLocaleData(localePT);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MenuComponent,
    AddPeopleComponent,
    AddAppointmentComponent,
    AddExamComponent,
    ListPeopleComponent,
    HomePageComponent,
    LoginPageComponent,
    ConfirmDialogComponent,
    CpfPipe,
    PhonePipe,
    CepPipe,
    AgePipe,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-br'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    }, {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
    provideNgxMask()
  ]
})
export class AppModule { }
