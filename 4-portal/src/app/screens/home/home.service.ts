import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { GlobalConstants } from 'src/app/shared/global.constant';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpService) { }

  //Get All User
  public getAllUser(){
    return this.httpService.get(
      GlobalConstants.server_url + GlobalConstants.get_all_user
    );
  }

  //Get User
  public getUser(id:string){
    return this.httpService.get(
      GlobalConstants.server_url + GlobalConstants.get_user + id
    )
  }

  //Delete User
  public deleteUser(id:string){
    return this.httpService.delete(
      GlobalConstants.server_url + GlobalConstants.delete_user + id
      );
  }

  //Update User
  public patchUser(id:string, userBody:any){
    return this.httpService.patch(
      GlobalConstants.server_url + GlobalConstants.patch_user + id, userBody
      );
  }
}
