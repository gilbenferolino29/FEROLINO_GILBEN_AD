import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Post('/register')
  addUser(@Body() body: any) {
    return this.userSerivce.register(body);
  }

  @Get('/all')
  getAll() {
    return this.userSerivce.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userSerivce.getUser(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body () body:any) {
    return this.userSerivce.updateUser(id,body);
    
  }

  @Put('/:id')
  changeUser(@Param('id') id: string, @Body() body:any) {
      return this.userSerivce.changeUser(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userSerivce.deleteUser(id);
  }

  @Post('/login')
  userLogin(@Body() body:any) {
    return this.userSerivce.login(body);
  }
  @Get('/search/:term')
  search(@Param('term') term: string) {
    return this.userSerivce.search(term);
  }
}
