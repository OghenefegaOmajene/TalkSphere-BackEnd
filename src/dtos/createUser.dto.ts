// import { Role, USER_ROLE } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateUserDTO {
    // @IsNotEmpty()
    // @Length(2, 50)
    userName!: string

    // @IsNotEmpty()
    // @Length(6, 20)
    password!: string

}