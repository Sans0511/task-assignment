import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  country: string;
  city: string;
  state: string;
  gender: "Male" | "Female" | "Other";
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
