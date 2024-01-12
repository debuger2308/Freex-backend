import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { UsersDataController } from './users-data.controller';
import { UsersDataService } from './users-data.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers:[UsersDataController],
    providers:[UsersDataService],
    imports: [
        SequelizeModule.forFeature([UsersData]),
        forwardRef(() => AuthModule)
    ],
    exports:[UsersDataService],
})
export class UsersDataModule {

}
