import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
   helloWorld(name:string){
    return 'Hello there! ' + name;
  }
  loopsTriangle(height:number){
    var string = '';
    for (var ctr = 0; ctr < height; ctr++) {
        string += '*';
        console.log(string);
       
    }
  }
}

