import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegister } from 'src/app/models/register';

@Component({
  selector: 'app-action-dialog-box',
  templateUrl: './action-dialog-box.component.html',
  styleUrls: ['./action-dialog-box.component.scss']
})
export class ActionDialogBoxComponent implements OnInit {

  action: string;
  local_data:any;

  constructor(public dialogRef: MatDialogRef<ActionDialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserRegister){
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
  }
   
  

  doAction(){
    this.dialogRef.close({event:this.action, data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'})
  }

  ngOnInit(): void {

  }

}
