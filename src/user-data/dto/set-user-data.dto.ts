import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export class SetUserDataDto {


    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "Must be number" })
    @Min(18)
    @Max(99)
    readonly age: number

    @MaxLength(30, { message: "Must be less then 30 symbols" })
    @IsString({ message: "Must be string" })
    readonly city: string

    @MaxLength(30, { message: "Must be less then 320 symbols" })
    @IsString({ message: "Must be string" })
    readonly description: string

    @MaxLength(30, { message: "Must be less then 20 symbols" })
    @IsString({ message: "Must be string" })
    readonly name: string

}