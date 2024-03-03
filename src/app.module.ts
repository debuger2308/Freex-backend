import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { UsersDataModule } from './user-data/users-data.module';
import { UsersData } from "./user-data/users-data.model";
import { SearchParamsController } from './search-params/search-params.controller';
import { SearchParamsModule } from './search-params/search-params.module';
import { SearchParams } from "./search-params/search-params.model";
import { ImagesModule } from './images/images.module';
import { Images } from "./images/images.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'


@Module({
    controllers: [SearchParamsController],
    providers: [

    ],
    imports: [

        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '../', 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadModels: true,
            models: [User, UsersData, SearchParams, Images],
        }),
        UsersModule,
        AuthModule,
        UsersDataModule,
        SearchParamsModule,
        ImagesModule,
        FilesModule,

    ]
})
export class AppModule { }