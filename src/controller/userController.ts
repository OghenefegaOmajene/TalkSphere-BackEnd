// import { NextFunction, Request, Response } from "express";
// import { CreateUserDTO } from "../dtos/createUser.dto";
// import { LoginUserDTO } from "../dtos/loginUser.dto";
// import { UserServiceImpl } from "../service/impl/userServiceImpl";
// import bcrypt from "bcryptjs";
// import { validate } from "class-validator";

// export class UserController {
//     private userService: UserServiceImpl;

//     constructor() {
//         this.userService = new UserServiceImpl();
//     }


//     public createUser = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ): Promise<void> => {
//         try {
//             const userData = req.body as CreateUserDTO;
//             const newUser = await this.userService.createUser(userData);
//             res.status(201).json({ message: "User created successfully", user: newUser });
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     };

   

//     public loginUser = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ): Promise<void> => {
//         try {
//             // Validate request body
//             const loginData = Object.assign(new LoginUserDTO(), req.body);
//             const errors = await validate(loginData);

//             if (errors.length > 0) {
//                 res.status(400).json({ message: "Invalid input", errors });
//                 return;
//             }

//             const { userName, password } = loginData;

//             // Check if user exists
//             const user = await this.userService.findUserByUsername(userName);
//             if (!user) {
//                 res.status(400).json({ message: "Username or password is incorrect" });
//                 return;
//             }

//             // Compare hashed password
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch) {
//                 res.status(400).json({ message: "Username or password is incorrect" });
//                 return;
//             }

//             res.status(200).json({ message: "Login successful", user });
//         } catch (error) {
//             res.status(500).json({ message: "Server error" });
//         }
//     };

    

// }

// import bcrypt from "bcryptjs";
// import { NextFunction, Request, Response } from "express"; 
// import { LoginUserDTO } from "../dtos/loginUser.dto";
// import { UserServiceImpl } from "../service/impl/userServiceImpl";
// import { validate } from "class-validator";

// export class UserController {
//     private userService: UserServiceImpl;

//     constructor() {
//         this.userService = new UserServiceImpl();
//     }

    
// }



import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { LoginUserDTO } from "../dtos/loginUser.dto";
import { UserServiceImpl } from "../service/impl/userServiceImpl";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";

export class UserController {
    private userService: UserServiceImpl;

    constructor() {
        this.userService = new UserServiceImpl();
    }

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userData = req.body as CreateUserDTO;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    public loginUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            // Validate request body
            const loginData = Object.assign(new LoginUserDTO(), req.body);
            const errors = await validate(loginData);

            if (errors.length > 0) {
                res.status(400).json({ message: "Invalid input", errors });
                return;
            }

            const { userName, password } = loginData;

            // Check if user exists
            const user = await this.userService.findUserByUsername(userName);
            if (!user) {
                res.status(400).json({ message: "Username or password is incorrect" });
                return;
            }

            // Log the stored password for debugging (REMOVE IN PRODUCTION)
            console.log("Stored Hashed Password:", user.password);
            console.log("Entered Password:", password);

            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Username or password is incorrect" });
                return;
            }

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    };
}
