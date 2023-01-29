import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { People, Person } from "../../shared/interfaces/interfaces";
import { DatabaseService } from "../../shared/services/database.service";

@Component({
  selector: 'lab-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements AfterViewInit {

  people: People = [];
  displayedColumns: string[] = ['seqId', 'name', 'healthInsurance'];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private databaseService: DatabaseService) {
    this.databaseService.getPeople()
      .subscribe(people => this.people = people);
    this.dataSource = new MatTableDataSource(this.people);
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