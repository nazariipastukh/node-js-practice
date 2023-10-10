import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGenders } from "../enums/gender.enum";

export class UserValidator {
  static validName = joi.string().min(2).max(20).trim();
  static validAge = joi.number().min(18).max(100);
  static validEmail = joi.string().regex(regexConstant.EMAIL).trim();
  static validGenders = joi.valid(...Object.values(EGenders));
  static validPassword = joi.string().regex(regexConstant.PASSWORD).trim();

  static update = joi.object({
    age: this.validAge,
    genders: this.validGenders,
    name: this.validName,
  });
  static register = joi.object({
    age: this.validAge.required(),
    email: this.validEmail.required(),
    genders: this.validGenders.required(),
    name: this.validName.required(),
    password: this.validPassword.required(),
  });
  static login = joi.object({
    email: this.validEmail.required(),
    password: this.validPassword.required(),
  });
}
