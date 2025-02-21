import { IsNotEmpty, Length } from "class-validator";

export class LoginUserDTO {
    // @IsNotEmpty()
    // @Length(2, 50)
    userName!: string;

    // @IsNotEmpty()
    // @Length(6, 20)
    password!: string;
}
