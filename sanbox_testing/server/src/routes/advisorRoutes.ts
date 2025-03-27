import express, { Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import { uploadFile } from '../services/uploadFileService'
import * as advisorService from '../services/advisorService'
import type { InAdvisor } from '../models/advisor'

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router()
dotenv.config();

router.get('/', async (req: Request, res: Response) => {
    res.json(await advisorService.getAllAdvisors())
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const advisor = await advisorService.getAdvisorById(id)
    if (advisor) {
      res.json(advisor)
    } else {
      res.status(404).send('Advisor not found')
    }
})

router.get('/advisor-feedback/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const advisorFeedback = await advisorService.getStudentByAdvisorById(id)
    if (advisorFeedback) {
      res.json(advisorFeedback)
    } else {
      res.status(404).send('Advisor Feedback not found')
    }
})

router.get('/advisorid/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
    const advisorId = await advisorService.getAdvisorIdByUserId(id)
    if (advisorId) {
      res.json(advisorId)
    } else {
      res.status(404).send('advisorId not found')
    }
})

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
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
    const newAdvisor: InAdvisor = req.body;

    // ตรวจสอบว่า req.body มีค่าหรือไม่
    if (!newAdvisor) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // เตรียมข้อมูล student สำหรับเพิ่ม
    const dataStudent = {
      username: newAdvisor.username,
      password: newAdvisor.password,
      first_name: newAdvisor.first_name,
      last_name: newAdvisor.last_name,
      picture: ouputUrl,
      academic_position_id: Number(newAdvisor.academic_position_id),
      department_id: Number(newAdvisor.department_id)
    };

    // เรียก service เพื่อเพิ่มข้อมูลนักศึกษา
    const result = await advisorService.addAdvisor(dataStudent);

    // ส่งข้อมูลที่เพิ่มสำเร็จกลับไป
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding Advisor:', error);
    // ตรวจสอบ error ที่เกิดขึ้น และส่ง response ตามกรณี
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

export default router
