import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { UsersDataController } from './users-data.controller';
import { UsersDataService } from './users-data.service';
import { AuthModule } from 'src/auth/auth.module';
import { SearchParamsModule } from 'src/search-params/search-params.module';
import { Images } from 'src/images/images.model';
import { VotesModule } from 'src/votes/votes.module';
import { VotesService } from 'src/votes/votes.service';
import { UsersModule } from 'src/users/users.module';


@Module({
    controllers: [UsersDataController],
    providers: [UsersDataService],
    imports: [
        SequelizeModule.forFeature([UsersData, Images]),
        forwardRef(() => AuthModule),
        SearchParamsModule,
        VotesModule,

    ],
    exports: [UsersDataService],
})
export class UsersDataModule { }
