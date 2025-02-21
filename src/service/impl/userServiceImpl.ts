// // import { Prisma, User } from '@prisma/client';
// // import { UserService } from '../userService'
// // import { CreateUserDTO } from '../../dtos/createUser.dto';
// // import { error } from 'console';
// // import { db } from '../../config/db';

// // export class UserServiceImpl implements UserService{
// //     async createUser(data: CreateUserDTO): Promise<User> {
// //         const isUserExists = await db.user.findFirst({
// //             where :{
// //                 userName: data.userName
// //             }
// //         })

// //         if (isUserExists) {
// //             throw new Error("User already Exists")
// //         }
        
// //         const user = await db.user.create({
// //             data: {
// //                 userName: data.userName,
// //                 password: data.password,
// //             }
// //         })

// //         return user;
// //     }

    
   
// // }

// import bcrypt from "bcryptjs";
// import { Prisma, User } from '@prisma/client';
// import { UserService } from '../userService'
// import { CreateUserDTO } from '../../dtos/createUser.dto';
// import { db } from '../../config/db';

// export class UserServiceImpl implements UserService {
//     async createUser(data: CreateUserDTO): Promise<User> {
//         const isUserExists = await db.user.findFirst({
//             where: { userName: data.userName }
//         });

//         if (isUserExists) {
//             throw new Error("User already exists");
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(data.password, 10);

//         const user = await db.user.create({
//             data: {
//                 userName: data.userName,
//                 password: hashedPassword, // Store hashed password
//             }
//         });

//         return user;
//     }

//     async findUserByUsername(userName: string): Promise<User | null> {
//         return await db.user.findFirst({
//             where: { userName }
//         });
//     }
    
// }



import bcrypt from "bcryptjs";
import { Prisma, User } from '@prisma/client';
import { UserService } from '../userService';
import { CreateUserDTO } from '../../dtos/createUser.dto';
import { db } from '../../config/db';

export class UserServiceImpl implements UserService {
    async createUser(data: CreateUserDTO): Promise<User> {
        const isUserExists = await db.user.findFirst({
            where: { userName: data.userName }
        });

        if (isUserExists) {
            throw new Error("User already exists");
        }

        if (!data.password) {
            throw new Error("Password is required");
        }

        // Log the plain password (REMOVE IN PRODUCTION)
        console.log("Plain Password:", data.password);

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Log the hashed password (REMOVE IN PRODUCTION)
        console.log("Hashed Password:", hashedPassword);

        const user = await db.user.create({
            data: {
                userName: data.userName,
                password: hashedPassword, // Store hashed password
            }
        });

        return user;
    }

    async findUserByUsername(userName: string): Promise<User | null> {
        return await db.user.findFirst({
            where: { userName }
        });
    }
}
