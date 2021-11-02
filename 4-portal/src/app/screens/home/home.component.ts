import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { UserBody } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
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
 
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private dialog: MatDialog, private homeService: HomeService, private router:Router) { }

  
  

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
  }

  openDialog(action: any, obj: { action: any; }){
    obj.action = action;
    const dialogRef = this.dialog.open(ActionDialogBoxComponent,{width: '300px', data:obj});

    dialogRef.afterClosed().subscribe(result =>{
    console.log(result);
      if(result.event == 'Delete'){
        this.deleteUser(result.data);
      }
      if(result.event == 'Update'){
        this.editUser(result.data, result.data);
      }
    })
  }


  public search = (value: Event) =>{
    const target = value.target as HTMLInputElement;
    console.log(target.value);
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
    this.homeService.searchUser(target.value.toLocaleLowerCase()).subscribe(next =>{
      console.log(next);
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
    var id = row_obj.id;
    delete userBody?.id;
    delete userBody?.action;

    console.log(userBody);
    
    this.homeService.editUser(id, userBody).subscribe((next:any)=>{
     console.log(next);
     window.location.reload();
      // After Edit unsa man imo e update para ma change ang table
      // Update Datasource
      // Acccess first Datasource
      // How to access datasource
      // check if what type is the datassource
      // what lambda function can be used para dali

      // this.dataSource = this.dataSource.filter((value, key) =>{
      //   if(value.id == row_obj.id){

      //   }
      //   return true;
      // });

      // this.dataSource.filterPredicate = ()
    })
  }

  deleteUser(row_obj:any){
    this.homeService.deleteUser(row_obj.id).subscribe((next:any)=>{
      console.log(next);
      alert(`${row_obj.id} successfully deleted`);
      const index = this.dataSource.data.indexOf(row_obj.id);
      console.log(index);
      this.dataSource.data.splice(index, 1)
      this.dataSource._updateChangeSubscription();
      
      });
  }

  updateTableData(tableData:any){
    setTimeout(() => {
      this.dataSource.data = tableData;
      this.dataSource.paginator = this.paginator;
    })
  }
}
