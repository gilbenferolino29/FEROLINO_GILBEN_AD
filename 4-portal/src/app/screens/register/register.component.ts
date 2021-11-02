import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { UserRegister } from 'src/app/models/register';
import { Router } from '@angular/router';
import { passwordMatchingValidator } from 'src/app/shared/password-matching.directive';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister = {} as UserRegister;

  passwordCheck:ValidatorFn = (control:AbstractControl) : ValidationErrors | null =>{
    var pass = control.get('password');
    var conPass = control.root.get('confirm');
    return pass && conPass && pass.value !== conPass.value ? {mismatch:true} : null;
  }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.min(1)),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required, ),
    confirm: new FormControl('', [Validators.required,passwordMatchingValidator()] )
  }, 
  
  );

  

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    console.log("Register Component Loaded!")
  }

  register(){
    if(this.registerForm.controls.password.value !==
      this.registerForm.controls.confirm.value){
        this.registerForm.controls.confirm.hasError('required');
      }

    this.userRegister.name = this.registerForm.controls.name.value;
    this.userRegister.age = this.registerForm.controls.age.value;
    this.userRegister.email = this.registerForm.controls.email.value;
    this.userRegister.password = this.registerForm.controls.password.value;

    this.registerService.registerUser(this.userRegister).subscribe((next:any)=>{
      console.log(next);
      if(next.success){
        this.router.navigateByUrl('home');
        alert("Account registration successful!");
      }
      else
        alert("Account registration unsuccessful!");
        
    }, error =>{
      console.log(error);
    })
  }

 
  nav(url:string){
    this.router.navigateByUrl(url);
  }
}
