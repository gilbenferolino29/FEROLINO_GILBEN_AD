import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
  //HELLO WORLD
   helloWorld(name:string){
    return 'Kumusta kayo! Ako si ' + name;
  }
  //LOOPSTRIANGLE
  loopsTriangle(height:number){
    for (var ctr = 0; ctr < height; ctr++) {
      var string  = '';
      var x = ctr;
        while(x){
          string += '*';
          x--;
        }
      console.log(string);
    }
    return;
  }
  primeNumber(num:number){
    var prime = true;

  //BEFORE ENTERING THE LOOP, CHECK NUMBER AS 1 IS NOT A PRIME NUMBER
    if (num == 1)
      prime = false

    for (var ctr = 2; ctr < num; ctr++) {
      if ((num % ctr) == 0) {
        prime = false;
      }
    }
//return 
    if (num <= 0){
      return "I can't seem to check that number as " + num +  " is not a valid number in checking Prime Numbers.\nPlease do try again :)";
    }
    else
    return "The number " + num + ((prime === true)?" is a transformer! Hence,":"is, unfortunate, not") + " a prime number"; 
  }
}

