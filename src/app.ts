import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { authMiddleware } from "./middlewares/auth.middleware";
import { authRouter } from "./routers/auth.router";
import { carRouter } from "./routers/car.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/*", authMiddleware.checkAccessToken);
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has successfully started on PORT: ${configs.PORT}`);
});
