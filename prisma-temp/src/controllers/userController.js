const UserModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name } = req.body; // ✅ pega do JSON do Postman
    if (!name) return res.status(400).json({ error: "Nome obrigatório" });

    const user = await UserModel.create(name); // ✅ passa o nome
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
