import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.type";
import { IUserCredentials } from "../types/user.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUserCredentials): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(body.password);

      await userRepository.register({ ...body, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(body: IUserCredentials): Promise<ITokensPair> {
    try {
      const user = await userRepository.getOne({ email: body.email });

      if (!user) {
        throw new ApiError("Invalid password or email", 401);
      }

      const isMatched = await passwordService.compare(
        body.password,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("Invalid password or email", 401);
      }

      const tokensPair = await tokenService.generateTokenPair({
        userId: user._id,
        name: user.name,
      });

      await tokenRepository.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    try {
      const tokensPair = tokenService.generateTokenPair({
        userId: payload.userId,
        name: payload.name,
      });

      await Promise.all([
        tokenRepository.create({ ...tokensPair, _userId: payload.userId }),
        tokenRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
