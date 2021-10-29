import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { UserBody } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogBoxComponent } from './action-dialog-box/action-dialog-box.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'action'];
  dataSource = new MatTableDataSource<UserBody>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private dialog: MatDialog, private homeService: HomeService, private router:Router) { }

  
  

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog(action: any, obj: { action: any; }){
    obj.action = action;
    const dialogRef = this.dialog.open(ActionDialogBoxComponent,{width: '300px', data:obj});

    dialogRef.afterClosed().subscribe(result =>{
      if(result.event == 'Delete'){
        this.deleteUser(result.data)
      }
    })
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



  deleteUser(row_obj:any){
    this.homeService.deleteUser(row_obj.id).subscribe((next:any)=>{
      console.log(next);
      console.log(next.data['id'])
      
      });
  }
}
