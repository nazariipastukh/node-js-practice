import { model, Schema } from "mongoose";

import { EProducers } from "../enums/producer.enum";

const carSchema = new Schema(
  {
    model: {
      type: String,
    },
    year: {
      type: Number,
      min: [1990, "Min year is 1990"],
      max: [2023, "Max year is 2023"],
    },
    producer: {
      type: String,
      enum: EProducers,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model("car", carSchema);
