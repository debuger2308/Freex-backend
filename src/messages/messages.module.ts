import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from './messages.model';
import { Chats } from 'src/chats/chats.model';
import { MessagesController } from './messages.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [MessagesService],
    controllers: [MessagesController],
    imports: [
        SequelizeModule.forFeature([Messages, Chats]),
        AuthModule
    ],
    exports:[MessagesService]
})
export class MessagesModule { }
