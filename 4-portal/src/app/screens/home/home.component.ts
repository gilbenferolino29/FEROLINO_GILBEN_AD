import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { UserBody } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  
  constructor(private dialog: MatDialog, private homeService: HomeService, private router:Router) { }

  
  

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog(action: any, obj: { action: any; }){
    obj.action = action;
    const dialogRef = this.dialog.open(ActionDialogBoxComponent,{width: '300px', data:obj});

    dialogRef.afterClosed().subscribe(result =>{
      console.log(result);
      if(result.event == 'Delete'){
        this.deleteUser(result.data)
      }
      if(result.event == 'Edit'){
        this.editUser(result.data, result.data)
      }
      this.ngOnInit();
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

  nav(url:string) {
    this.router.navigateByUrl(url);
  }

  editUser(row_obj:any, userBody:any){
    this.homeService.editUser(row_obj.id, userBody).subscribe((next:any)=>{
      console.log(next)
      this.dataSource.data = next.data;
    })
  }

  deleteUser(row_obj:any){
    this.homeService.deleteUser(row_obj.id).subscribe((next:any)=>{
      console.log(next);
      this.dataSource.data = next.data;
      
      });
  }
}
