import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class UserDto {

    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    readonly other: string;
}
