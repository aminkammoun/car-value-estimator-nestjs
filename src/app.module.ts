import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/entities/user.entity';
import { Reports } from './reports/entities/reports.entity';
import { TestCrudModule } from './test-crud/test-crud.module';
import { DB_NAME } from './environments';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: DB_NAME,
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
