import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { GlobalConstants } from 'src/app/shared/global.constant'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpService: HttpService) { }

  public registerUser(userBody:any){
    return this.httpService.post(
      GlobalConstants.server_url + GlobalConstants.register_user, userBody
    )
  }
}
