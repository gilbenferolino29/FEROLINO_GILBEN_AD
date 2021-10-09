import { Helper } from './helper';
import { CRUDReturn } from './crud_return.interface';
import * as admin from 'firebase-admin';

export class User {
    // private name: string;
    // private age: number;
    // private email: string;
    // private password: string;
    //To automatically add the properties at the same time with its objects
    constructor(
        private name: string,
        private age: number,
        private email: string,
        private password: string,
        private id?: string
    ) {
        if (id != undefined) {
            this.id = id;
        } else {
            this.id = Helper.generateUID();
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }

    async retrieve(id: string): Promise<User> {
        try {
            var DB = admin.firestore();
            var dataOutput = await DB.collection('users').doc(id).get();
            if (dataOutput.exists) {
                var data = dataOutput.data();
                return new User(data.name, data.age, data.email, data.password, dataOutput.id);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
      }
    

    async commit(): Promise<CRUDReturn> {
        try {
            var DB = admin.firestore();
            var dataOutput = await DB.collection('users')
                .doc(this.id)
                .set(this.toJsonPass());
            return{
                success: true,
                data: this.toJsonID()}
        } catch (error) {
            console.log(error);
            return { success: false, data: error };
        }
    }

    
    replaceValues(body: any): boolean {
        try {
          var keys: Array<string> = Helper.describeClass(User);
          keys = Helper.removeItemOnce(keys, 'id');
          for (const key of Object.keys(body)) {
            this[key] = body[key];
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }


    //To Be Replaced
    setName(name: string) {
        this.name = name;
    }
    setAge(age: number) {
        this.age = age;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setPassword(password: string) {
        this.password = password;
    }

    login(email: string, password: string): CRUDReturn {
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

    search(term: string): boolean {
        var keys: Array<string> = Helper.describeClass(User);
        keys = Helper.removeItemOnce(keys, 'password');
        for (const key of keys) {
            if (`${this[key]}` === term) return true;
        }
        return false;
    }

    log() {
        console.log(
            `Id: ${this.id} Name: ${this.name}, Age: ${this.age}, Email: ${this.email}`,
        );
    }

    toJson() {
        return {
            name: this.name,
            age: this.age,
            email: this.email,
        };
    }

    toJsonID() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email,
        };
    }

    toJsonPass() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email,
            password: this.password,
        };
    }
}
