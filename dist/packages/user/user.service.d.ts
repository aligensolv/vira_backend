import { UserRepository } from "./user.repo";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAllUsers: ({ q }: {
        q?: string;
    }) => Promise<unknown>;
}
