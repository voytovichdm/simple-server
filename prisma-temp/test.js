require("dotenv").config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== CREATE ===");
 
  const newUser = await prisma.user.create({
    data: { name: "Dhay" }
  });
  console.log("Usuário criado:", newUser);

  console.log("\n=== READ ===");

  const allUsers = await prisma.user.findMany();
  console.log("Todos os usuários:", allUsers);

  const userById = await prisma.user.findUnique({
    where: { id: newUser.id }
  });
  console.log("Usuário por ID:", userById);

  console.log("\n=== UPDATE ===");
  
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { name: "Dhayanne" }
  });
  console.log("Usuário atualizado:", updatedUser);

  console.log("\n=== DELETE ===");
 
  const deletedUser = await prisma.user.delete({
    where: { id: newUser.id }
  });
  console.log("Usuário deletado:", deletedUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
