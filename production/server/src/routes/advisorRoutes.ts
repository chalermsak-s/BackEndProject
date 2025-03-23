import express, { Request, Response } from 'express'
import * as advisorService from '../services/advisorService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(await advisorService.getAllAdvisors())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    res.status(200).json(await advisorService.getAdvisorById(id))
  } catch (error) {
    res.status(500).json({
      error_code: 'ADVS_ID_INVALID',
      message: 'Invalid Advisor ID. Please check and try again.',
    })
  }
})

export default router
