const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];
let nextId = 1;

app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Nome é obrigatório!");
  }

  const newUser = {
    id: nextId++,
    name: name
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado");
  }

  if (!name) {
    return res.status(400).send("Nome é obrigatório");
  }

  user.name = name;

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).send("Usuário não encontrado");
  }

  users.splice(index, 1);

  res.send("Usuário removido com sucesso ✅");
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado ❌");
  }

  res.json(user);
});

console.log("test2");

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
