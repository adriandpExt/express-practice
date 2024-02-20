import asyncHandler from "express-async-handler";
import TodoModel from "../models/todoModel.mjs";

//@desc GET all TODO
//@route GET /api/todo
//@access private
export const getAllTodo = asyncHandler(async (req, res) => {
  const getTodo = await TodoModel.find({ userId: req.user.id });

  if (!getTodo) {
    return res.status(404).json({ message: "NOT FOUND" });
  }
  res.status(200).json(getTodo);
});

//@desc POST all TODO
//@route POST /api/todo
//@access private
export const postTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ message: "Cannot be empty!" });
  }

  const postTodos = await TodoModel.create({
    todo,
    userId: req.user.id,
  });

  res.status(200).json({
    todo: postTodos.todo,
    message: "Successfully posted",
  });
});

//@desc PUT all TODO
//@route PUT /api/todo/:id
//@access public
export const putTodo = asyncHandler(async (req, res) => {
  const todo = await TodoModel.findById(req.params.id).exec();

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const updatedTodo = await TodoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTodo);
});

//@desc DELETE all TODO
//@route DELETE /api/todo/:id
//@access private
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await TodoModel.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ message: "Todo deleted successfully" });
});
