import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { Exercise3Service } from './exercise3.service';

//your-domain.com/exercise3
@Controller('exercise3')
export class Exercise3Controller {
    constructor(private readonly e3: Exercise3Service){}

//your-domain.com/exercise3/helloworld/name
    @Get("/helloWorld/:name")
    getHello(@Param('name')name:string): string {
      return this.e3.helloWorld(name);
    }
//your-domain.com/exercise3/loopsTriangle/height
    @Get("/loopsTriangle/:height")
    loopsTriangle(@Param('height') height:string) {
      var parsedHeight = parseInt(height);
      return this.e3.loopsTriangle(parsedHeight);
    }
    @Get("primeNumbers/:num")
    get_primeNumbers(@Param('num') num:string){
      var parsedNum = parseInt(num);
      return this.e3.primeNumber(parsedNum);
    }
  }
  