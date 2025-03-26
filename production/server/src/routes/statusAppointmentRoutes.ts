import express, { Request, Response } from 'express'
import * as statusAppointmentService from '../services/statusAppointmentService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  res.json(await statusAppointmentService.getAllStatusAppointments())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const statusappointment = await statusAppointmentService.getgetAllStatusAppointmentsById(id)
  if (statusappointment) {
    res.json(statusappointment)
  } else {
    res.status(404).send('Status Appointment not found')
  }
})

export default router
