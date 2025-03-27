import express, { Request, Response } from 'express'
import * as announcementService from '../services/announcementService'
import { uploadFile } from '../services/uploadFileService'
import multer from 'multer'
import dotenv from 'dotenv'
import type { InAnnouncement } from '../models/announcement'

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router()
dotenv.config();

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

router.get('/advisor-id-by-student-id/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const getAnnouncementByStudentId = await announcementService.getAnnouncementByStudentId(id)
    if (getAnnouncementByStudentId) {
      res.json(getAnnouncementByStudentId)
    } else {
      res.status(404).send('Announcement studentId to advisorId not found')
    }
})

router.get('/announcement-advisor/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const getAnnouncementAdvisor = await announcementService.getAnnouncementByAdvisorId(id)
    if (getAnnouncementAdvisor) {
      res.json(getAnnouncementAdvisor)
    } else {
      res.status(404).send('Announcement of this advisor not found')
    }
})

router.post('/announcement-advisor/:id', upload.single('file'), async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    // รับไฟล์จาก req.file
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;

    // ตรวจสอบการตั้งค่าของ bucket และ file path
    if (!bucket || !filePath) {
      return res.status(500).send('Bucket name or file path not configured.');
    }

    // เรียกฟังก์ชัน uploadFile เพื่ออัปโหลดไฟล์ไปยัง Supabase และรับ URL
    const ouputUrl = await uploadFile(bucket, filePath, file);

    // รับข้อมูลจาก req.body
    const newAnnouncement: InAnnouncement = req.body;

    // ตรวจสอบว่า req.body มีค่าหรือไม่
    if (!newAnnouncement) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // เตรียมข้อมูล student สำหรับเพิ่ม
    const topic = req.body.topic
    const description = req.body.description
    const picture = ouputUrl


    // เรียก service เพื่อเพิ่มข้อมูลนักศึกษา
    const result = await announcementService.addAnnouncementByAdvisorId(id, topic, description, picture);

    // ส่งข้อมูลที่เพิ่มสำเร็จกลับไป
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding advisor:', error);

    // ตรวจสอบ error ที่เกิดขึ้น และส่ง response ตามกรณี
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});


export default router