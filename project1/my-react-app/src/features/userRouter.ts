import { Router } from 'express'
import prisma from '../../db.js'; 

const usersRouter = Router()

usersRouter.get('/:id', async (req, res) => {
    const id = await parseInt(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
          id,
        }
      });
    console.log('yes yes yes')
    res.json(user)
  })