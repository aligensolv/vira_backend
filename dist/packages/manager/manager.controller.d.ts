import { ManagerService } from "./manager.service";
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    getAllManagersHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
    getSingleManagerHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
    createManagerHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
    updateManagerHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
    deleteManagerHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
}
