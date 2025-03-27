import express, { Request, Response } from 'express'
import * as departmentService from '../services/departmentService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json(await departmentService.getAllDepartments())
  } catch (error) {
    res.status(500).json({
      error_code: 'DEPT_INVALID',
      message: 'Invalid Department. Please check and try again.',
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    res.status(200).json(await departmentService.getDepartmentById(id))
  } catch (error) {
    res.status(500).json({
      error_code: 'DEPT_ID_INVALID',
      message: 'Invalid department ID. Please check and try again.',
    })
  }
})

router.get('/search/:key', async (req: Request, res: Response) => {
  const departmentname = req.params.key as string
  try {
    res
      .status(200)
      .json(await departmentService.getDepartmentByName(departmentname))
  } catch (error) {
    res.status(500).json({
      error_code: 'DEPT_NAME_INVALID',
      message: 'Invalid department name. Please check and try again.',
    })
  }
})

export default router
