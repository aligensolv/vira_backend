import { Request, Response } from "express";
import asyncWrapper from "../../lib/async_wrapper";
import { AuthService } from "./auth.service";

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  loginUserHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.authService.loginUser(req.body);
      res.json(data);
    }
  );

  registerUserHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.authService.registerUser(req.body);
      res.json(data);
    }
  );

  getCurrentUserHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.authService.getCurrentUser(req.user_id);
      res.json(data);
    }
  );

  logoutUserHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      await this.authService.logoutUser()
      res.json({ message: "Logged out successfully" });
    }
  );
}
