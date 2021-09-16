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
  addUser(
    @Body('name') userName: string,
    @Body('age') userAge: number,
    @Body('email') userEmail: string,
    @Body('password') userPass: string,
  ) {
    const generatedUser = this.userSerivce.addUser(
      userName,
      userAge,
      userEmail,
      userPass,
    );
    return { user: generatedUser };
  }

  @Get('/all')
  getAll() {
    return this.userSerivce.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const userData = this.userSerivce.getUser(id);
    return { user: userData };
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body('name') userName: string,
    @Body('age') userAge: number,
    @Body('email') userEmail: string,
    @Body('password') userPass: string,
  ) {
    return this.userSerivce.updateUser(id, userName, userAge, userEmail, userPass);
    
  }

  @Put('/:id')
  changeUser(
    @Param('id') id: string,
    @Body('name') userName: string,
    @Body('age') userAge: number,
    @Body('email') userEmail: string,
  ) {
      return this.userSerivce.changeUser(id, userName, userAge, userEmail);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userSerivce.deleteUser(id);
  }

  @Post('/login')
  userLogin(
    @Body('email') userEmail: string,
    @Body('password') userPass: string,
  ) {
    return this.userSerivce.login(userEmail, userPass);
  }
  @Get('/search/:term')
  search(@Param('term') term: string) {
    return this.userSerivce.search(term);
  }
}
