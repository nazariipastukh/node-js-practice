import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async createUser(body: IUser): Promise<IUser> {
    await this.isEmailUnique(body.email);
    return await userRepository.createUser(body);
  }

  public async updateUser(
    userId: string,
    body: Partial<IUser>,
  ): Promise<IUser> {
    return await userRepository.updateUser(userId, body);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  private async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getOne({ email });
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }
}

export const userService = new UserService();
