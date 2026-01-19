const prisma = require('../config/prisma');

const ArticleModel = {
  async create(title, content, userId) {
    // Confirma que o userId existe
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true }
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado'); 
    }

    return await prisma.article.create({
      data: {
        title,
        content,
        userId: parseInt(userId)
      }
    });
  },

  async findAll() {
    return await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  },

  async findById(id) {
    return await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  },

  async update(id, title, content) {
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;

    if (Object.keys(data).length === 0) return null;

    return await prisma.article.update({
      where: { id: parseInt(id) },
      data
    });
  },

  async delete(id) {
    return await prisma.article.delete({
      where: { id: parseInt(id) }
    });
  },

  async userExists(userId) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true }
    });
    return !!user;
  }
};

module.exports = ArticleModel;
