import { NotFoundException } from "@nestjs/common";

export class User {
    // private id: number;
    // private name: string;
    // private age: number;
    // private email: string;
    // private password: string;
//To automatically add the properties at the same time with its objects
    constructor(
        private id: string, 
        private name: string, 
        private age: number, 
        private email: string, 
        private password?: string){}

        
        getName(){
            return this.name;
        }
        
        getAge(){
            return this.age;
        }

        getEmail(){
            return this.email ;
        }
        getPassword(){
            return this.password;
        }

        setName(name:string){
            this.name = name;
        }
        setAge(age: number){
            this.age= age;
        }
        setEmail(email:string){
            this.email = email;
        }
        setPassword(password: string){
            this.password = password;
        }

        login(email:string, password:string){
        if (this.email === email && this.password != password)
             return false;
        else if (this.email === email && this.password === password)
            return true;
        }

        search(term:string){
            if(term.toUpperCase() === (this.id).toString().toUpperCase() || term.toUpperCase() === (this.name).toString().toUpperCase() || term.toUpperCase() === (this.age).toString().toUpperCase() || term.toUpperCase() == (this.email).toString().toUpperCase())
                return true;
        }

        

        log(){
        console.log(`Id: ${(this.id)} Name: ${this.name}, Age: ${this.age}, Email: ${this.email}`)
        }

        toJson(){
            return{
                id:this.id,
                name:this.name,
                age:this.age,
                email:this.email
        }}
        toJsonPass(){
            return{
                id:this.id,
                name:this.name,
                age:this.age,
                email:this.email,
                password:this.password
        }}
}