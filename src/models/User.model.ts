import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Min age is 1"],
      max: [100, "Max age is 100"],
    },
    genders: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model("user", userSchema);
