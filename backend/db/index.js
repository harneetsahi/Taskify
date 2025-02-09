import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  done: {
    type: Boolean,
  },

  userId: {
    type: ObjectId,
  },
});

const UserModel = mongoose.model("users", UserSchema);
const TodoModel = mongoose.model("todos", TodoSchema);

export { UserModel, TodoModel };
