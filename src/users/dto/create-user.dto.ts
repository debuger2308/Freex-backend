import { IsString, Length } from "class-validator"

export class CreateUserDto {


    @IsString({ message: 'Must be string' })
    @Length(4, 12, { message: 'No less than four and no more than twelve' })
    readonly nickname: string

    @IsString({ message: 'Must be string' })
    @Length(4, 16, { message: 'No less than four and no more than sixteen' })
    readonly password: string
}