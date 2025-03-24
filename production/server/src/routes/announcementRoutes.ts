import express, { Request, Response } from 'express'
import * as announcementService from '../services/announcementService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(await announcementService.getAllAnnouncements())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const announcement = await announcementService.getAnnouncementById(id)
    if (announcement) {
      res.json(announcement)
    } else {
      res.status(404).send('Announcement not found')
    }
})

export default router