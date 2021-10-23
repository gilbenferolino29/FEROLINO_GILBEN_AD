import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //Variables
  private httpOptions: any;

  constructor(private http: HttpClient) { }

  //Get Headers
  private getHeaders(){
    return this.httpOptions = {
      headers: new HttpHeaders ({'Content-type':'application/json'})
    }
  }

  // HTTP GET
  public get(url:string){
    return this.http.get(url, this.getHeaders());
  }

  // HTTP POST
  public post(url: string, model: any) {
    return this.http.post(url, model, this.getHeaders());
  }
  
  // HTTP PUT

  // HTTP DELETE

  // HTTP PATCH
}
