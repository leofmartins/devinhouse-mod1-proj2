import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PERSONS } from "src/app/shared/mocks/database-mock";
import { Person } from "../../shared/interfaces/interfaces";

@Component({
  selector: 'lab-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements AfterViewInit {
  displayedColumns: string[] = ['seqId', 'name', 'healthInsurance'];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
   this.dataSource = new MatTableDataSource(PERSONS);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clicked() {
    console.log("clicked");
  }

}