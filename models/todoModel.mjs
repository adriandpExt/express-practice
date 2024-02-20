import { Schema, model } from "mongoose";

const TodoSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users", /// db table reference
    },
    todo: {
      type: String,
      required: [true, "Cannot be empty"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Todo", TodoSchema);
