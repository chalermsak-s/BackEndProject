import express, { Request, Response } from 'express'
import * as appointmentService from '../services/appointmentService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(await appointmentService.getAllAppointments())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const appointment = await appointmentService.getAppointmentById(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const appointment = await appointmentService.getAppointmentById(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.get('/student/:studentId', async (req: Request, res: Response) => {
  const studentId = parseInt(req.params.studentId)
    const appointment = await appointmentService.getAppointmentByStudentId(studentId)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.get('/advisor/:advisorId', async (req: Request, res: Response) => {
  const advisorId = parseInt(req.params.advisorId)
    const appointment = await appointmentService.getAppointmentByAdvisorId(advisorId)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.put('/:id/confirm', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const appointment = await appointmentService.confirmAppointment(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.put('/:id/cancel', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const appointment = await appointmentService.cancelAppointment(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.put('/advisor/:id/confirm', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const appointment = await appointmentService.confirmAppointmentAdvisor(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.put('/advisor/:id/cancel', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const appointment = await appointmentService.cancelAppointmentAdvisor(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.post('/', async (req: Request, res: Response) => {
    const appointment = await appointmentService.createAppointment(req.body)
    res.status(201).json(appointment)
})

router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const appointment = await appointmentService.updateAppointment(id, req.body)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const appointment = await appointmentService.deleteAppointment(id)
    if (appointment) {
      res.json(appointment)
    } else {
      res.status(404).send('Appointment not found')
    }
})

router.post('/student/add', async (req: Request, res: Response) => {
  const appointment = await appointmentService.AddAppointmentByStudent(req.body)
  if (appointment) {
    res.status(201).json(appointment)
  } else {
    res.status(404).send('Appointment not found')
  }
})



router.get('/appointment-advisor/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const getAppointmentByAdvisor = await appointmentService.getAppointment2ByAdvisorId(id)
    if (getAppointmentByAdvisor) {
      res.json(getAppointmentByAdvisor)
    } else {
      res.status(404).send('Appointment by this advisor not found')
    }
})

export default router