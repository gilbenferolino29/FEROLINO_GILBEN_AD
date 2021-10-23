import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { GlobalConstants } from 'src/app/shared/global.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService) {}

  //Sign-In
  public signInUser (userBody: any){
    return this.httpService.post(
      GlobalConstants.server_url + GlobalConstants.sign_in_user, userBody
    );

  }

}
