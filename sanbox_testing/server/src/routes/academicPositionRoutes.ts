import express, { Request, Response } from 'express'
import * as academicPositionService from '../services/academicPositionService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(await academicPositionService.getAllAcademicPositions())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const academicPosition = await academicPositionService.getAcademicPositionById(id)
    if (academicPosition) {
      res.json(academicPosition)
    } else {
      res.status(404).send('Academic Position not found')
    }
})

export default router
