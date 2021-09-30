import { User } from './user.resources/user.model';
import { v4 as uid } from 'uuid';
import {
  NotFoundException,
  Injectable,
  NotAcceptableException,
  ConsoleLogger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CRUDReturn } from './user.resources/crud_return.interface';
import { Helper } from './user.resources/helper';

@Injectable()
export class UserService {
  private users: Map<string, User> = new Map<string, User>();

  constructor() {
    this.users = Helper.populate();
  }

  //Check Duplicates for email
  private emailCheck(user: any): boolean {
    for (const userOnMap of this.users.values())
      if (userOnMap.getEmail() === user.email) return true;
  }

  //Saves to database (Will change to Firebase - For modularity)
  saveToDb(user: User): boolean {
    if (this.users.set(user.getId(), user)) return true;
  }

  //For registering - @POST
  register(body: any): CRUDReturn {
    try {
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.valid) {
        if (!this.emailCheck(body)) {
          var newUser: User = new User(
            body.name,
            body.age,
            body.email,
            body.password,
          );
          if (this.saveToDb(newUser)) {
            return {
              success: true,
              data: newUser.toJson(),
            };
          } else {
            throw new InternalServerErrorException('Generic Database Error');
          }
        } else
          throw new NotAcceptableException(
            `${body.email} is already in use by another user. Please try again.`,
          );
      } else throw new Error(validBody.data);
    } catch (error) {
      console.log(error.message);
      return { success: false, data: `Error adding account, ${error.message}` };
    }
  }

  //Get all data of the map "users"
  getAll(): CRUDReturn {
    var populatedData: Array<any> = [];
    for (const user of this.users.values()) {
      populatedData.push(user.toJson());
    }
    return { success: true, data: populatedData };
  }

  //Get data for a specific user w/o its password
  getUser(id: string): CRUDReturn {
    try {
      if (this.users.has(id))
        return { success: true, data: this.users.get(id).toJson() };
      else throw new NotFoundException(`${id} not found. Please try again.`);
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        data: `Error getting account, ${error.message}`,
      };
    }
  }

  //Search for user
  search(term: string): CRUDReturn {
    var searchData: Array<any> = [];
    for (const user of this.users.values()) {
      if (user.search(term)) searchData.push(user.toJson());
    }
    return { success: searchData.length > 0, data: searchData };
  }

  //Deletes User
  deleteUser(id: string): CRUDReturn {
    try {
      if (this.users.has(id)) {
        this.users.delete(id);
        return {
          success: true,
          data: `User with ID ${id} has been successfully deleted.`,
        };
      } else throw new NotFoundException(`${id} not found. Please try again.`);
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        data: `Error deleting account, ${error.message}`,
      };
    }
  }
  //Update all values of a certain user given the ID
  changeUser(id: string, body: any): CRUDReturn {
    try {
      if (!this.users.has(id))
          throw new InternalServerErrorException(
            `User with ID ${id} not found. Please try again.`,
          );
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.valid) {
        for (const [key, user] of this.users.entries()) {
          if (key === id) {
            if (body.name) {
              user.setName(body.name);
            }
            if (body.age) {
              user.setAge(body.age);
            }
            if (body.email) {
              if (this.emailCheck(body))
                throw new NotAcceptableException(
                  `${body.email} is already in use by another user. Please try again.`,
                );
              else user.setEmail(body.email);
            }
          }
        }
        console.log(this.users.get(id).toJson());
        return { success: true, data: this.users.get(id).toJson() };
      } else throw new InternalServerErrorException(validBody.data);
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        data: `Error in updating all values of user, ${error.message}`,
      };
    }
  }
  //Update certain values of a certain user given the ID
  updateUser(id: string, body: any) {
    try {
      if (!this.users.has(id))
          throw new InternalServerErrorException(
            `User with ID ${id} not found. Please try again.`,
          );
          var validBody: { valid: boolean; data: string } =
          Helper.validBody(body);
      if(validBody.valid){
        for (const [key, user] of this.users.entries()) {
          if (key === id) {
            if (body.name) {
              user.setName(body.name);
            }
            if (body.age) {
              user.setAge(body.age);
            }
            if (body.email) {
              if (this.emailCheck(body))
                throw new NotAcceptableException(
                  `${body.email} is already in use by another user. Please try again.`,
                );
              else user.setEmail(body.email);
            }
            if (body.password){
              user.setPassword(body.password);
            }
          }
        }
        console.log(this.users.get(id).toJson());
        return { success: true, data: this.users.get(id).toJson() };
      } else throw new InternalServerErrorException(validBody.data);
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        data: `Error in updating all values of user, ${error.message}`,
      };
    }
  }
  //Logging in
  login(body: any): CRUDReturn {
    for (const user of this.users.values()) {
      if (user.getEmail() === body.email){
        var login = user.login(body.email, body.password);
        if(login.success)
          return login;
        else return login;
    }
  }
  return {success:false, data:"Email does not exist!"}
}

  logAllUsers() {
    for (const user of this.users.values()) user.log();
  }

  // populate() {
  //   this.users.set('1',new User('1', 'James', 18, 'james@email.com', '123456'),);
  //   this.users.set('2', new User('2', 'John', 18, 'john@email.com', '143441'));
  //   this.users.set('3', new User('3', 'Luke', 18, 'luke@email.com', '654321'));
  //   this.users.set('4',new User('4', 'Judas', 13, 'judas@email.com', '696969'),);
  // }
}
