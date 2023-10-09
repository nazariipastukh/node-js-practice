import { Token } from "../models/Token.model";
import { IToken } from "../types/token.type";

export class TokenRepository {
  public async create(body: Partial<IToken>): Promise<IToken> {
    return await Token.create(body);
  }
}

export const tokenRepository = new TokenRepository();
