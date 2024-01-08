import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.services";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadModels: true,
        })
    ]
})
export class AppModule { }