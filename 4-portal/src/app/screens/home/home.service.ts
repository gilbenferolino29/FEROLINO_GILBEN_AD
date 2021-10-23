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
}
