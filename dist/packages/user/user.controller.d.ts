import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsersHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
}
