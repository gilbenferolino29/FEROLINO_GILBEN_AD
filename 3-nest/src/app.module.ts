import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Exercise3Module } from './exercise3/exercise3.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [Exercise3Module, UserModule],
  controllers: [AppController], //Responsible for accepting requests: Handle requests and Give Response
  providers: [AppService], //Provide service (e.g to fetch data)
})
export class AppModule {}
