import express from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!process.env.DB_JWT_SECRET) {
      throw new Error("DB_JWT_SECRET is missing in environment variables!");
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, password: true }
    });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.DB_JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
  }
});

export default authRouter