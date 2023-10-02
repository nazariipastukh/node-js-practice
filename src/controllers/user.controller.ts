import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      console.log("get users");

      return res.json(users);
    } catch (e) {
      next();
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.res.locals;
      const { id } = req.params;

      res.json(user);

      console.log(`get user ${id}`);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
