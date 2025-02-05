const auth = require("../middleware/auth.js");
const {
  createTodo,
  getTodos,
  deleteTodo,
} = require("../controller/todoController.js");
const express = require("express");

const router = express.Router();

router.post("/post", auth, createTodo);
router.get("/get", auth, getTodos);

router.delete("/:id", auth, deleteTodo);

module.exports = router;
