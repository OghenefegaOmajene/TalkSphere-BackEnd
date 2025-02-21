import { Prisma, User } from '@prisma/client';
import { UserService } from '../userService'
import { CreateUserDTO } from '../../dtos/createUser.dto';
import { error } from 'console';
import { db } from '../../config/db';

export class UserServiceImpl implements UserService{
    async createUser(data: CreateUserDTO): Promise<User> {
        const isUserExists = await db.user.findFirst({
            where :{
                userName: data.userName
            }
        })

        if (isUserExists) {
            throw new Error("User already Exists")
        }
        
        const user = await db.user.create({
            data: {
                userName: data.userName,
                password: data.password,
            }
        })

        return user;
    }

    
    // async createUser(data: CreateUserDTO): Promise<User> {
    //     const isUserExists = await Prisma.user.find
    // }

}