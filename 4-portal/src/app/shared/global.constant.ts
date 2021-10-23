import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalConstants {
  constructor() {}

  // Server URL
  public static server_url = environment.apiUrl + '/';

  // Login Path 
  public static sign_in_user = "user/login";
  public static get_all_user = "user/all";
  public static register_user = "user/register";
}