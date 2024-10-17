import { Body, Controller, HttpStatus, Post, Req, Res, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Throttle } from '@nestjs/throttler';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request, response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: "Auth user" })
    @ApiResponse({ status: 200, type: "jwt-token" })
    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Res({ passthrough: true }) response: Response, @Body() userDto: CreateUserDto) {
        const tokens = await this.authService.login(userDto)
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 24 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        return { token: tokens.accessToken }
    }

    @ApiOperation({ summary: "Create user" })
    @ApiResponse({ status: 200, type: "jwt-token" })
    @Throttle({ default: { ttl: 3600000, limit: 300 } })
    @Post('/registration')
    @UsePipes(ValidationPipe)
    async registration(@Res({ passthrough: true }) response: Response, @Body() userDto: CreateUserDto) {
        const tokens = await this.authService.registration(userDto)
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 24 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        return { token: tokens.accessToken }
    }

    @ApiOperation({ summary: "Logout user" })
    @ApiResponse({ status: 200 })
    @Throttle({ default: { ttl: 3600000, limit: 300 } })
    @Post('/logout')
    async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const { refreshToken } = request.cookies
        response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        await this.authService.logout(refreshToken)
        return HttpStatus.OK
    }
    @ApiOperation({ summary: "Refresh JWT Token" })
    @ApiResponse({ status: 200 })
    @Post('/refresh')
    async refreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        console.log(request.cookies);
        const refreshToken = request.cookies.refreshToken
        const tokens = await this.authService.refreshToken(refreshToken)
        response.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 24 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        return { token: tokens.accessToken }
    }
}
