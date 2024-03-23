import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from './messages.model';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Messages) private messagesRepository: typeof Messages) { }

    async createMessage({ messageType: messageType, ...dto }) {
        const message = await this.messagesRepository.create({ messageType: messageType, ...dto })
        return message
    }
}
