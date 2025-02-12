const express = require("express");
const auth = require("../middleware/auth.js");
const { createTodo, getTodos, deleteTodo,updateTodo } = require("../controller/todoController.js");

const router = express.Router();

router.post("/", auth, createTodo);
router.put("/:id", auth, updateTodo);
router.get("/", auth, getTodos);
router.delete("/:id", auth, deleteTodo);

module.exports = router;
