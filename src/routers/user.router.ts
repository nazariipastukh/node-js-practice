import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";

import { userController } from "../controllers/user.controller";
import { ApiError } from "../errors/api.error";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

const router = Router();

export const userRouter = router;

router.get("", userController.getAll);

router.get(
  ":id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = UserValidator.create.validate(req.body);

    if (error) {
      throw new ApiError(error.message, 400);
    }

    const createdUser = await User.create(value);
    res.status(201).json(createdUser);

    console.log(`posted user ${createdUser.id}`);
  } catch (e) {
    next(e);
  }
});

router.put(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (mongoose.isObjectIdOrHexString(id)) {
      throw new ApiError("Not Valid Id", 400);
    }

    const { error, value } = UserValidator.update.validate(req.body);

    if (error) {
      throw new ApiError(error.message, 400);
    }

    const user = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
    });

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    res.status(201).json({
      message: "User Updated",
    });

    console.log(`updated ${id}`);
  } catch (e) {
    next(e);
  }
});

router.delete(
  ":id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not Valid Id", 400);
      }

      const { deletedCount } = await User.deleteOne({ _id: id });

      if (!deletedCount) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json({
        message: "User Deleted",
      });

      console.log(`deleted${id}`);
    } catch (e) {
      next(e);
    }
  },
);
