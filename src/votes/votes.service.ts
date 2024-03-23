import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Votes } from './votes.model';
import { VotesDto } from './dto/votes.dto';
import { UsersService } from 'src/users/users.service';
import { ChatsService } from 'src/chats/chats.service';
import { MessagesService } from 'src/messages/messages.service';
const { Op } = require("sequelize");
@Injectable()
export class VotesService {
    constructor(@InjectModel(Votes) private voteRepository: typeof Votes,
        private chatsService: ChatsService,
        @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
        private messagesService: MessagesService
    ) { }

    async vote(dto: VotesDto, req: any) {
        const user = await this.usersService.getUserByUserIdWithVotes(req.user.id)
        const chat = await this.chatsService.findChat({ userId1: req.user.id, userId2: dto.votedUserId })
        const candidat = await this.voteRepository.findOne({ where: { userId: req.user.id, votedUserId: dto.votedUserId } })
        const sympathy = await this.voteRepository.findOne({ where: { userId: dto.votedUserId, votedUserId: req.user.id } })
        if (candidat) {
            await this.voteRepository.update(dto, { where: { userId: req.user.id, votedUserId: dto.votedUserId } })
        }
        else {
            const vote = await this.voteRepository.create(dto)
            await user.$set('votes', [...user.votes, vote])
        }

        if (dto.vote) {
            const chat = await this.chatsService.createOrUpdateChat({
                userId1: req.user.id,
                userId2: dto.votedUserId,
                chatType: `${sympathy?.vote ? 'main' : 'spam'}`
            })

            const message = await this.messagesService.createMessage({
                userId: null,
                messageType: 'like',
                value: `${user.id}`
            })
            chat.$set('messages', [...chat.messages, message,])

        }

        else if (!dto.vote && chat) {

            await this.chatsService.updateChatType({ chatId: chat.chatId, chatType: 'spam' })
            const message = await this.messagesService.createMessage({
                userId: null,
                messageType: 'dislike',
                value: `${user.id}`
            })
            chat.$set('messages', [...chat.messages, message])
        }

        return HttpStatus.OK
    }

    async getVotesById(id: number) {
        const votes = this.voteRepository.findAll({ where: { userId: id } })
        return votes
    }
}
