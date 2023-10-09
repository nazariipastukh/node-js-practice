import { FilterQuery } from "mongoose";

import { Car } from "../models/Car.model";
import { ICar } from "../types/car.type";

class CarRepository {
  public async getAll(): Promise<ICar[]> {
    const cars = await Car.find();
    return cars as any;
  }

  public async getOne(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }

  public async findById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }

  public async createCar(body: ICar): Promise<ICar> {
    return await Car.create(body);
  }

  public async updateCar(carId: string, body: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, body, {
      returnDocument: "after",
    });
  }

  public async deleteCar(carId: string): Promise<void> {
    await Car.deleteOne({ _id: carId });
  }
}

export const carRepository = new CarRepository();
