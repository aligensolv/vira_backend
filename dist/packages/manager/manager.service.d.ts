import z from "zod";
import { ManagerRepository } from "./manager.repo";
import { createManagerSchema, updateManagerSchema } from "./manager.schema";
export declare class ManagerService {
    private readonly managerRepository;
    constructor(managerRepository: ManagerRepository);
    getAllManagers: () => Promise<unknown>;
    getSingleManager: (id: number) => Promise<unknown>;
    createManager: (data: z.infer<typeof createManagerSchema>) => Promise<unknown>;
    deleteManager: (id: number) => Promise<unknown>;
    updateManager: (id: number, data: z.infer<typeof updateManagerSchema>) => Promise<unknown>;
}
