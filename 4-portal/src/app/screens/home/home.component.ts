import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { UserBody } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'email'];
  dataSource = new MatTableDataSource<UserBody>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private homeService: HomeService, private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    console.log('GET ALL USER!');
    this.homeService.getAllUser().subscribe((next:any) => {
      console.log(next);
      console.log(next.data);
      this.dataSource.data = next.data;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    }, error => {
      console.log(error);
    })
  }

  login(){
    this.router.navigateByUrl('');
  }
}
