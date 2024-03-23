import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from 'src/messages/messages.model';
import { Chats } from './chats.model';
import { MessagesModule } from 'src/messages/messages.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [
    SequelizeModule.forFeature([Messages, Chats]),
    MessagesModule,
    AuthModule
  ],
  exports: [ChatsService]
})
export class ChatsModule { }
