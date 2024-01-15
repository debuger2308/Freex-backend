import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersData } from 'src/user-data/users-data.model';
import { UsersDataModule } from 'src/user-data/users-data.module';
import { SearchParams } from 'src/search-params/search-params.model';
import { SearchParamsModule } from 'src/search-params/search-params.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UsersData, SearchParams]),
    UsersDataModule,
    SearchParamsModule
  ],
  exports: [UsersService]
})
export class UsersModule { }
