import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'
import { AuthService } from './Auth/auth.service';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.Mid';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule { 

  configure(consummer: MiddlewareConsumer){
    consummer.apply(CurrentUserMiddleware).forRoutes('*')
  }

}
