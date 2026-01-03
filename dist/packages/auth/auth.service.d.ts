import { loginUserSchema, registerUserSchema } from './auth.schema';
import z from "zod";
import { AuthRepository } from "./auth.repo";
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    loginUser: ({ email, password }: z.infer<typeof loginUserSchema>) => Promise<unknown>;
    getCurrentUser: (user_id: number) => Promise<unknown>;
    registerUser: ({ name, email, password }: z.infer<typeof registerUserSchema>) => Promise<unknown>;
    logoutUser: () => Promise<unknown>;
}
