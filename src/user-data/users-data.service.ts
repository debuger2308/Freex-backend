import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { UpdateUserDataDto } from './dto/update-user-data.dto';

@Injectable()
export class UsersDataService {

    constructor(@InjectModel(UsersData) private userRepository: typeof UsersData) { }

    async createUserData(dto: UpdateUserDataDto) {
        const userData = await this.userRepository.create(dto)
        return userData
    }

}
