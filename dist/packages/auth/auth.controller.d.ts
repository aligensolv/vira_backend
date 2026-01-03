import { Request, Response } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUserHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    registerUserHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getCurrentUserHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    logoutUserHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
}
