import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async createCar(body: ICar): Promise<ICar> {
    return await carRepository.createCar(body);
  }

  public async updateCar(carId: string, body: Partial<ICar>): Promise<ICar> {
    return await carRepository.updateCar(carId, body);
  }

  public async deleteCar(carId: string): Promise<void> {
    await carRepository.deleteCar(carId);
  }

  private async isEmailUnique(email: string): Promise<void> {
    const car = await carRepository.getOne({ email });
    if (car) {
      throw new ApiError("Email already exist", 409);
    }
  }
}

export const carService = new CarService();
