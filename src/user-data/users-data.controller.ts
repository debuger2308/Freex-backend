import { Body, Controller, Put } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { UpdateUserDataDto } from './dto/update-user-data.dto';

@Controller('user-data')
export class UsersDataController {
    constructor(private usersDataService: UsersDataService) { }

    // @Put('/data')
    // updateData(@Body() updateUserDataDto: UpdateUserDataDto) {
    //     return this.usersDataService.updateUsersData(updateUserDataDto)
    // }

    

}
