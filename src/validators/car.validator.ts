import joi from "joi";

import { EProducers } from "../enums/producer.enum";

export class CarValidator {
  static validModel = joi.string().min(2).max(10).trim();
  static validYear = joi.number().min(1990).max(2023);
  static validProducer = joi.valid(...Object.values(EProducers));

  static create = joi.object({
    year: this.validYear.required(),
    producer: this.validProducer.required(),
    model: this.validModel.required(),
  });
  static update = joi.object({
    year: this.validYear,
    model: this.validModel,
  });
}
