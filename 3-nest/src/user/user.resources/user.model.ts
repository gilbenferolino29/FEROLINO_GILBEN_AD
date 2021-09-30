import { Helper } from "./helper";
import { CRUDReturn } from "./crud_return.interface";

export class User {
     private id: string;
    // private name: string;
    // private age: number;
    // private email: string;
    // private password: string;
//To automatically add the properties at the same time with its objects
    constructor(
        private name: string, 
        private age: number, 
        private email: string, 
        private password?: string){
            this.id = Helper.generateUID();
        }
        getId(){
            return this.id;
        }
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

        replaceValues (body:any): boolean{
         var keys: Array<string> = Helper.describeClass(body);
         keys = Helper.removeItemOnce(keys, 'password');
            for(const key of keys){
                if(`${this[key]}` === body.key) return true;
            }
            return false;
        }
        setName(name:string){
            this.name = name;
        }
        setAge(age: number){
            this.age = age;
        }
        setEmail(email:string){
            this.email = email;
        }
        setPassword(password: string){
            this.password = password;
        }

        login(email:string, password:string):CRUDReturn{
            try {
                if (this.password === password) {
                  return { success: true, data: this.toJson() };
                } else {
                  throw new Error(`${this.email} login fail, password does not match`);
                }
              } catch (error) {
                return { success: false, data: error.message };
              }
            }
            
        search(term:string):boolean{
            var keys: Array <string> = Helper.describeClass(User);
            keys = Helper.removeItemOnce(keys, 'password');
            for(const key of keys){
                if (`${this[key]}` === term) return true;
            }
            return false;
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