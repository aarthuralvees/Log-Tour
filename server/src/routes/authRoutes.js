import express from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({
        where: { username },
        select: { id: true, username: true, password: true }
    });
    
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.DB_JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
})

export default authRouter