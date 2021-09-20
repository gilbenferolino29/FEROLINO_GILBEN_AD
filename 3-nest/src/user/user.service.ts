import { User } from './user.model';
import {
  NotFoundException,
  Injectable,
  NotAcceptableException,
  ConsoleLogger,
  InternalServerErrorException,
} from '@nestjs/common';
import { concat } from 'rxjs';

@Injectable()
export class UserService {
  private users: Map<string, User> = new Map<string, User>();

  constructor() {
    this.populate();
  }

  //Generates random ID
  genId(name: string) {
    return name.substr(0, 3).concat(Math.random().toString(36).substr(5, 9));
  }

  //Check Duplicates for email
  private emailCheck(email: string): boolean {
    for (const userOnMap of this.users.values())
      if (userOnMap.getEmail() == email) return true;
    return false;
  }

  //Search for user
  search(term: string) {
    var searchData = [];
    for (const user of this.users.values()) {
      if (user.search(term)) searchData.push(user.toJson());
    }
    if(searchData.length == 0)
      throw new NotFoundException('User not found. Please try again.');
    return searchData;
  }

  //Deletes User
  deleteUser(id: string) {
    if (this.users.has(id)) {
      this.users.delete(id);
      return JSON.stringify(
        `User with ID ${id} has been successfully removed.`,
      );
    }
    throw new NotFoundException('User not found. Please try again.');
  }
 //Update all values of a certain user given the ID
  changeUser(id: string, name: string, age: number, email: string) {
        let userTemp = [];
        let userChanged = [];
        if (!this.users.has(id))
          throw new NotFoundException('User not found. Please try again.');
    for (const [key, user] of this.users.entries()) {
        if (key === id) {
            userTemp.push(user.toJson());
          if (name) {
            user.setName(name);
          }
          if (age) {
            user.setAge(age);
          }
          if (email) {
            if (this.emailCheck(email))
                throw new NotAcceptableException("Email is already taken. Please try again.");
            else
                user.setEmail(email)
          }
          userChanged.push(user.toJson())
          if (userTemp != userChanged)   
            return {"User updated successfully": true};
        throw new NotAcceptableException("There was a lacking input. All data value must be changed. Please try again.");
        }
      } 
  }

  //Update values of a certain user given the ID
  updateUser(
    id: string,
    name: string,
    age: number,
    email: string,
    password: string,
  ) {
    for (const [key, user] of this.users.entries()) {
      if (key === id) {
        if (name) {
          user.setName(name);
        }
        if (age) {
          user.setAge(age);
        }
        if (email) {
            if (this.emailCheck(email))
                throw new NotAcceptableException("Email is already taken. Please try again.");
            else
                user.setEmail(email)
        }
            
        if (password) {
          user.setPassword(password);
        }
        return {"User updated successfully": true};
      }
      
    }
    throw new InternalServerErrorException("User update unsuccessful. May be because of invalid input. Please try again.");
  }

  //Logging in
  login(email: string, password: string) {
    for (const user of this.users.values()) {
      if (user.login(email, password)) return { success: true };
    }
    return { message: 'Invalid Email/Password. Please try again!' };
  }

  //For registering
  addUser(name: string, age: number, email: string, password: string) {
    var id: string;

    id = this.genId(name);

    if (this.emailCheck(email))
      throw new NotAcceptableException('Email is already taken. Please try again.',);

    this.users.set(id, new User(id, name, age, email, password));
    for (const [key, user] of this.users.entries()) {
      if (key === id) user.log();
    }

    return true;
  }

  //Get data for a specific user w/o its password
  getUser(id: string) {
    if (this.users.has(id)) return this.users.get(id).toJson();
    else throw new NotFoundException('User not found. Please try again.');
  }

  logAllUsers() {
    for (const user of this.users.values()) user.log();
  }

  //Get all data of the map "users"
  getAll() {
    var populatedData = [];
    for (const user of this.users.values()) {
      populatedData.push(user.toJson());
    }
    return populatedData;
  }

  populate() {
    this.users.set('1',new User('1', 'James', 18, 'james@email.com', '123456'),);
    this.users.set('2', new User('2', 'John', 18, 'john@email.com', '143441'));
    this.users.set('3', new User('3', 'Luke', 18, 'luke@email.com', '654321'));
    this.users.set('4',new User('4', 'Judas', 13, 'judas@email.com', '696969'),);
  }
}
