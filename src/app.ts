import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators/user.validator";

const app = express();

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has successfully started on PORT: ${configs.PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json(error.message);
});

app.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();

      console.log("get users");

      return res.json(users);
    } catch (e) {
      next(e);
    }
  },
);

app.get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not Valid Id", 400);
      }

      const user = await User.findById(id);

      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.json(user);

      console.log(`get user ${id}`);
    } catch (e) {
      next(e);
    }
  },
);

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
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

app.put(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

app.delete(
  "/users/:id",
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
