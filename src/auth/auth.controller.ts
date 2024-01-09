import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Throttle({ default: { ttl: 3600000, limit: 3 } })
    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
