import { Body, Controller, Put, Headers, UseGuards, Req } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { SetUserDataDto } from './dto/update-user-data.dto';
import { UserDataGuard } from 'src/auth/user-data.guard';


@Controller('user-data')
export class UsersDataController {
    constructor(private usersDataService: UsersDataService) { }

    @Put('/data')
    @UseGuards(UserDataGuard)
    setUserData(@Body() updateUserDataDto: SetUserDataDto, @Req() req: any) {

        return this.usersDataService.setUserData(updateUserDataDto, req)
    }

}
