import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersData } from 'src/user-data/users-data.model';
import { UsersDataModule } from 'src/user-data/users-data.module';
import { SearchParams } from 'src/search-params/search-params.model';
import { SearchParamsModule } from 'src/search-params/search-params.module';
import { ImagesModule } from 'src/images/images.module';
import { Images } from 'src/images/images.model';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [

    SequelizeModule.forFeature([User, UsersData, SearchParams, Images]),
    UsersDataModule,
    SearchParamsModule,
    ImagesModule
  ],
  exports: [UsersService]
})
export class UsersModule { }
