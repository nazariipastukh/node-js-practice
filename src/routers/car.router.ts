import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

export const carRouter = router;

router.get("/", carController.getAll);
router.post(
  "/",
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.createCar,
);

router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);
router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carController.deleteCar,
);
router.put(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carController.updateCar,
  commonMiddleware.isBodyValid(CarValidator.update),
);
