import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserLogin } from 'src/app/models/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin = {} as UserLogin;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    console.log("Login Component Loaded!")
  }

   signIn() {
    console.log("Sign In!");
    this.userLogin.email = this.loginForm.controls.email.value;
    this.userLogin.password = this.loginForm.controls.password.value;
    console.log(`${this.userLogin.email}${this.userLogin.password}`)

     this.loginService.signInUser(this.userLogin).subscribe((next) =>{
      console.log(next)
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error)
    })

    console.log("here4")
  }
  register(){
    this.router.navigateByUrl('/register');
  }


}
