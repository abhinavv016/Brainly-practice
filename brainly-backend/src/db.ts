import { config } from "./config";
import mongoose from "mongoose";
import {model, Schema} from "mongoose";
import {z} from "zod";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

export const UserValidationSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 character long").max(20),
  password: z.string().min(5, "Passowrd must be atleast 5 character long").max(20)
})

export type UserType = z.infer<typeof UserValidationSchema>;

const UserSchema = new Schema<UserType>({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});
export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag'}],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true}
})
export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
  hash: String,
  link: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
})
export const LinkModel = model("Links", LinkSchema);
