import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/entities/user.entity';
import { Reports } from './reports/entities/reports.entity';
import { TestCrudModule } from './test-crud/test-crud.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Reports],
    synchronize: true
  }),
    /* TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017',
      database: 'nestdb',
      entities: [User, Reports],
      synchronize: true
    }), */
    UsersModule, ReportsModule, TestCrudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
