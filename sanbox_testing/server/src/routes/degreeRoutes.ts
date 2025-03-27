import * as deegreeService from '../services/deegreeService'
import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(await deegreeService.getAllDeegrees())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    res.status(200).json(await deegreeService.getDeegreeById(id))
  } catch (error) {
    res.status(500).json({
      error_code: 'DREEGREE_ID_INVALID',
      message: 'Invalid Dreegree ID. Please check and try again.',
    })
  }
})

export default router
