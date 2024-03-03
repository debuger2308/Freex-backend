import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { UsersDataController } from './users-data.controller';
import { UsersDataService } from './users-data.service';
import { AuthModule } from 'src/auth/auth.module';
import { SearchParamsModule } from 'src/search-params/search-params.module';
import { Images } from 'src/images/images.model';

@Module({
    controllers: [UsersDataController],
    providers: [UsersDataService],
    imports: [
        SequelizeModule.forFeature([UsersData, Images]),
        forwardRef(() => AuthModule),
        SearchParamsModule
    ],
    exports: [UsersDataService],
})
export class UsersDataModule { }
