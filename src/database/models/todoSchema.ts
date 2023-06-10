import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: String,
    isCompleted: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
