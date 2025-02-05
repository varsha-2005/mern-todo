const Todo = require("../models/todoModel.js");

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title, userId: req.user.id });
    const todo = await newTodo.save();

    res.status(201);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
