const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
