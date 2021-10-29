import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalConstants {
  constructor() {}

  // Server URL
  public static server_url = environment.apiUrl + '/';

  // Login Path 
  public static sign_in_user = "user/login";
  // Get All Users Path
  public static get_all_user = "user/all";
  // Register Path
  public static register_user = "user/register";
  // Delete User ... Edit User ... Get User
  public static delete_user = "user/"
  public static patch_user = "user/"
  public static get_user = "user/"
}