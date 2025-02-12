const Todo = require("../models/todoModel.js");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title }, { new: true });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const todos = await Todo.find({ userId: req.user.id }); 
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title, userId: req.user.id });
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
          return res.status(404).json({ message: "Todo not found" });
      }
      const todos = await Todo.find({ userId: req.user.id });
      res.status(200).json(todos);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

module.exports = { createTodo, getTodos, deleteTodo,updateTodo };
