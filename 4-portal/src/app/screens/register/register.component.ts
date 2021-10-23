import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { UserRegister } from 'src/app/models/register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister = {} as UserRegister;


  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl(0, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })


  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    console.log("Register Component Loaded!")
    


  }

  register(){
    this.userRegister.name = this.registerForm.controls.name.value;
    this.userRegister.age = this.registerForm.controls.age.value;
    this.userRegister.email = this.registerForm.controls.email.value;
    this.userRegister.password = this.registerForm.controls.password.value;

    this.registerService.registerUser(this.userRegister).subscribe(next=>{
      console.log(next);
    }, error =>{
      console.log(error);
    })
  }

  login(){
    this.router.navigateByUrl('');
  }
}
