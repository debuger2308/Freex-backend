import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersData } from './users-data.model';
import { SetUserDataDto } from './dto/set-user-data.dto';
import { SearchParamsService } from 'src/search-params/search-params.service';
import calcDistance from 'src/uitls/calcDistance';


const { Op } = require("sequelize");

@Injectable()
export class UsersDataService {

    constructor(@InjectModel(UsersData) private userRepository: typeof UsersData, private searchParamsService: SearchParamsService) { }

    async createUserData(dto: SetUserDataDto) {
        const userData = await this.userRepository.create(dto)
        return userData
    }

    async setUserData(dto: SetUserDataDto, req: any) {
        const [, [userData]] = await this.userRepository.update(dto, { where: { userId: req.user.id }, returning: true })
        return userData
    }

    async getUserData(req: any) {
        const id = req.user.id
        const userData = await this.userRepository.findOne({ where: { id }, include: ['images'] })
        return userData
    }

    async getUsersData(req: any) {
        const searchParams = await this.searchParamsService.getSearchParams(req)
        const userData = await this.getUserData(req)

        if (!searchParams.gender
            || !searchParams.minAge
            || !searchParams.maxAge
            || !searchParams.distance
            || !searchParams) {
            throw new HttpException("User without searchParams", HttpStatus.FORBIDDEN)
        }
        else if (!userData || !userData.location) {
            throw new HttpException("User without userData", HttpStatus.FORBIDDEN)
        }
        const usersData = await this.userRepository.findAll({
            where: {
                gender: searchParams.gender,
                age: { [Op.between]: [searchParams.minAge, searchParams.maxAge] },
                userId: {
                    [Op.ne]: req.user.id
                }
            },
            include: ['images']
        })

        return usersData.map((data) => {
            const distance = calcDistance(data.location, userData.location)
            if (distance <= searchParams.distance) {
                data.location = ''
                return data
            }
        })

    }
}
