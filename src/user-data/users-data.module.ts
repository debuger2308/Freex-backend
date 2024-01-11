import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { UsersDataController } from './users-data.controller';
import { UsersDataService } from './users-data.service';

@Module({
    controllers:[UsersDataController],
    providers:[UsersDataService],
    imports: [
        SequelizeModule.forFeature([UsersData])
    ],
    exports:[UsersDataService],
})
export class UsersDataModule {

}
