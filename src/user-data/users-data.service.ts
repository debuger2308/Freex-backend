import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { SetUserDataDto } from './dto/update-user-data.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersDataService {

    constructor(@InjectModel(UsersData) private userRepository: typeof UsersData) { }

    async createUserData(dto: SetUserDataDto) {
        const userData = await this.userRepository.create(dto)
        return userData
    }

    async setUserData(dto: SetUserDataDto, req) {

        const userData = await this.userRepository.update(dto, { where: { userId: req.user.id } })
        return userData
    }
}
