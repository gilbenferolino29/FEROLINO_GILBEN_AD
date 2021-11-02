import * as admin from 'firebase-admin';

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
import e from 'express';

@Injectable()
export class UserService {
  private DB = admin.firestore();
  constructor() {
    Helper.populate();
  }

  
  
  
  //Check Duplicates for email
  private async emailCheck(userEmail: string): Promise<boolean> {
   try {
     var data = await this.DB.collection('users').where("email", "==", userEmail).get();
     var result:boolean;
     if(data.size > 0){
       for (const doc of data.docs) {
         var userResults = doc.data();
          if(userResults["email"] === userEmail)
            return true;

       }
     }else return false;
   } catch (error) {
     console.log(error);
   }
  }


  //Saves to database (Will change to Firebase - For modularity)
  async saveToDb(user: User): Promise<boolean> {
    try {
      var commit = await user.commit();
      return commit.success;
    } catch (error) {
      return false;
    }
  }



  //For registering - @POST
  async register(body: any): Promise<CRUDReturn> {
    try {
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.valid) {
        var exists = await this.emailCheck(body.email);
        if (!exists) {
          var newUser: User = new User(
            body.name,
            body.age,
            body.email,
            body.password,
          );
          if (await this.saveToDb(newUser)) {
            return {
              success: true,
              data: newUser.toJsonID(),
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

  //Get all data of the map "users" ?? READ
  async getAll(): Promise <CRUDReturn> {
    try {
      Helper.populate();
      var userObjects = await this.getAllUserObjects();
      var populatedData: Array<any> = [];
      for (const user of userObjects.values()) {
        populatedData.push(user.toJsonID());
        }
      return { success: true, data: populatedData };
    } catch (error) {
      return { success: false, data: error.message };
    }
}

  async getAllUserObjects():Promise<Array<User>> {
    var results: Array<User> = []
    try {
      var dbData = await this.DB.collection('users').get();
      dbData.forEach((doc) => {
        if (doc.exists) {
          var data = doc.data();
          results.push(
            new User(data.name, data.age, data.email, data.password, data.id),
          );
        }
      });
      //console.log(results);
      return results;
    } catch (error) {
      return null;
    }
  }

  //Get data for a specific user w/o its password ??READ
  async getUser(id: string): Promise <CRUDReturn> {
    try {
      var dbData = await this.DB.collection('users').doc(id).get();
      if(dbData.exists){
        var data = dbData.data();
        return {success: true, data: data}
      }else throw new NotFoundException(`${id} not found. Please try again.`);
          
      }catch (error) {
      console.log(error.message);
      return {success: false,data: `Error getting account, ${error.message}`};
    }
  }


  //Search for user
  async search(term: string): Promise<CRUDReturn> {
    try {
      var userObjects = await this.getAllUserObjects();
      var searchData: Array<any> = [];
    for (const user of userObjects.values()) {
      if (user.search(term)) searchData.push(user.toJsonID());
    }
    return { success: searchData.length > 0, data: searchData };
    } catch (error) {
      console.log(error);
    }
    
  }

  //Deletes User
  async deleteUser(id: string): Promise <CRUDReturn> {
    try {
      var dataOutput = await this.DB.collection('users').doc(id).get();
      if(dataOutput.exists) {
        await this.DB.collection('users').doc(id).delete();
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
  async replaceValuesUser(id: string, body: any): Promise<CRUDReturn> {
    try {
      var dataOutput = await this.DB.collection('users').doc(id).get();
      //console.log(this.converter(dataOutput));
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);  
      if(dataOutput.exists) {
          var data = dataOutput.data();
          if (validBody.valid) {
            var exists = await this.emailCheck(body.email);
                  if (!exists){
                        var rUser = new User (data.name, data.age, data.email, data.password, id)
                        console.log(rUser.toJsonPass());
                        var success = rUser.replaceValues(body);
                        console.log(success);
                        if(success){
                          var update = await rUser.commit();
                          return {success: true, data: update.data}
                        }
                  }else throw new NotAcceptableException(
                    //check first if this user email is the same emaildata in db
                    //if not throrw error below
                    
                      `${body.email} is already in use by another user. Please try again.`,
                    );
          }else throw new InternalServerErrorException(validBody.data);
         } else throw new NotFoundException(`${id} not found. Please try again.`);
        
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        data: `Error in updating all values of user, ${error.message}`,
      };
    }
  }

  //Update certain values of a certain user given the ID
  async updateUser(id: string, body: any): Promise <CRUDReturn> {
    try {
      var dataOutput = await this.DB.collection('users').doc(id).get();
      //console.log(this.converter(dataOutput));
      var validBody: { valid: boolean; data: string } =
        Helper.validBody(body);  
      if(dataOutput.exists) {
          var data = dataOutput.data();
          if (validBody.valid) {
            var exists = await this.emailCheck(body.email);
                  if ((exists && data.id === id) ||!exists){
                    console.log(data.id);
                        var rUser = new User (data.name, data.age, data.email, data.password, id)
                        console.log(rUser.toJsonPass());
                        var success = rUser.replaceValues(body);
                        console.log(success);
                        if(success){
                          var update = await rUser.commit();
                          return {success: true, data: update.data}
                        }
                  }else throw new NotAcceptableException(
                      `${body.email} is already in use by another user. Please try again.`,
                    );
          }else throw new InternalServerErrorException(validBody.data);
         } else throw new NotFoundException(`${id} not found. Please try again.`);
        
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        data: `Error in updating all values of user, ${error.message}`,
      };
    }
  }
  //Logging in
  async login(body: any): Promise<CRUDReturn> {
    var emailPass = await this.DB.collection('users').where('email','==',body.email).get();
    if(emailPass.size > 0){
      for(const doc of emailPass.docs){
        if(doc.exists){
        var userData = doc.data();
        console.log(userData.password);
        var user: User = new User (userData.name, userData.age, userData.email, userData.password, userData.id);
        if (user.getEmail() === body.email) {
         
          var login = user.login(body.email, body.password);
          if (login.success) return login;
          else return login;
        }
      }
    }
    }else return { success: false, data: 'Email does not exist!' };
    
  }

  // logAllUsers() {
  //   for (const user of this.users.values()) user.log();
  // }

  // populate() {
  //   this.users.set('1',new User('1', 'James', 18, 'james@email.com', '123456'),);
  //   this.users.set('2', new User('2', 'John', 18, 'john@email.com', '143441'));
  //   this.users.set('3', new User('3', 'Luke', 18, 'luke@email.com', '654321'));
  //   this.users.set('4',new User('4', 'Judas', 13, 'judas@email.com', '696969'),);
  // }
}
