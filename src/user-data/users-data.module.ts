import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { UsersDataController } from './users-data.controller';
import { UsersDataService } from './users-data.service';
import { AuthModule } from 'src/auth/auth.module';
import { SearchParamsModule } from 'src/search-params/search-params.module';

@Module({
    controllers: [UsersDataController],
    providers: [UsersDataService],
    imports: [
        SequelizeModule.forFeature([UsersData]),
        forwardRef(() => AuthModule),
        SearchParamsModule
    ],
    exports: [UsersDataService],
})
export class UsersDataModule { }
