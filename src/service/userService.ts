
import { CreateUserDTO } from "../dtos/createUser.dto";
import { LoginUserDTO } from "../dtos/loginUser.dto";
import { User } from "@prisma/client";

export interface UserService{
    createUser(data: CreateUserDTO): Promise <User>
    createUser(data: LoginUserDTO): Promise <User>
}