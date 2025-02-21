
import { CreateUserDTO } from "../dtos/createUser.dto";
import { User } from "@prisma/client";

export interface UserService{
    createUser(data: CreateUserDTO): Promise <User>
}