import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDataService } from 'src/user-data/users-data.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private userDataService: UsersDataService) {

    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const userData = await this.userDataService.createUserData({ age: null, city: null, description: null, name: null, sex: null })
        await user.$set('userData', userData)
        user.userData = userData
        return user
    }

    async getUsersByNickname(nickname: string) {
        const user = await this.userRepository.findOne({
            where: { nickname }, include: { all: true }
        })
        return user
    }
}
