const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nome obrigatório" });
    const user = await UserModel.create(name);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar usuários
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await UserModel.update(req.params.id, name);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    const user = await UserModel.delete(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
