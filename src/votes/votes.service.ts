import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Votes } from './votes.model';
import { VotesDto } from './dto/votes.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VotesService {
    constructor(@InjectModel(Votes) private voteRepository: typeof Votes, 
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService) { }

    async vote(dto: VotesDto, req: any) {
        const user = await this.usersService.getUserByUserIdWithVotes(req.user.id)

        const candidant = await this.voteRepository.findOne({ where: { userId: req.user.id, votedUserId: dto.votedUserId } })

        if (candidant) {
            const vote = await this.voteRepository.update(dto, { where: { userId: req.user.id, votedUserId: dto.votedUserId } })
        }
        else {
            const vote = await this.voteRepository.create(dto)
            await user.$set('votes', [...user.votes, vote])
        }
        return {}
    }

    async getVotesById(id: number) {
        const votes = this.voteRepository.findAll({ where: { userId: id } })
        return votes
    }
}
