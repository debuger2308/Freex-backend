import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chats } from './chats.model';


const { Op } = require("sequelize");

@Injectable()
export class ChatsService {
    constructor(@InjectModel(Chats) private chatsRepository: typeof Chats) { }

    async createOrUpdateChat({ userId1, userId2, chatType }: { userId1: number, userId2: number, chatType: string })
        : Promise<Chats> {

        const [chat, created] = await this.chatsRepository.findOrCreate({
            where: {
                [Op.or]: [
                    { chatId: `${userId1}-${userId2}` },
                    { chatId: `${userId2}-${userId1}` },
                ]
            },
            defaults: { chatId: `${userId1}-${userId2}`, chatType: chatType, userId1: userId1, userId2: userId2, messages: [] },
            include: ['messages']
        },)
        if (!created) {
            chat.chatType = chatType
            chat.save()
        }

        return chat


    }

    async updateChatType({ chatId, chatType }: { chatId: string, chatType: string }) {
        const chat = await this.chatsRepository.update({ chatType: chatType }, { where: { chatId: chatId } })
        return chat
    }


    async findChat({ userId1, userId2 }: { userId1: number, userId2: number }) {
        const chat = await this.chatsRepository.findOne({
            where: {
                [Op.or]: [
                    { chatId: `${userId1}-${userId2}` },
                    { chatId: `${userId2}-${userId1}` },
                ]
            }, include: ['messages']
        })

        return chat
    }

    async getChats(req: any) {
        const chats = await this.chatsRepository.findAll({
            where: {
                [Op.or]: [
                    { userId1: req.user.id },
                    { userId2: req.user.id },
                ]


            },
            include: ['messages']
        })
        return chats
    }
}
