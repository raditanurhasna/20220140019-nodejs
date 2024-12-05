const express = require("express");
const router = express.Router();

let todos = [
  {
    id: 1,
    task: "Belajar Node.Js",
    completed: false,
  },
  {
    id: 2,
    task: "Membuat API",
    completed: false,
  },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.delete("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).json({ message: "Tugas Tidak Ditemukan" });

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.status(200).json({ message: `Tugas ${deletedTodo.task} Telah Dihapus` });
});

router.put("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Tugas Tidak Ditemukan" });

  res.status(200).json({
    message: `Tugas Dengan ID ${todo.id} Telah Diperbarui`,
    updatedTodo: todo,
  });
});

module.exports = router;