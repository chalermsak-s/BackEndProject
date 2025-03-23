import express, { Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import { uploadFile } from '../services/uploadFileService'
import * as studentService from '../services/studentService'
import type { InStudent } from '../models/student'

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router()
dotenv.config();

router.get('/', async (req: Request, res: Response) => {
  if (req.query.pageSize && req.query.pageNo) {
    const pageSize = parseInt(req.query.pageSize as string) || 3
    const pageNo = parseInt(req.query.pageNo as string) || 1
    const keyword = (req.query.keyword as string) || ''
    try {
      const result = await studentService.getAllStudentPagination(
        keyword,
        pageSize,
        pageNo
      )
      if (result.students.length === 0) {
        res.status(404).send('No event found')
        return
      }
      res.setHeader('x-total-count', result.count.toString())
      res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
      res.json(result.students)
    } catch (error) {
      if (pageNo < 1 || pageSize < 1) {
        res.status(400).send('Invalid pageNo or pageSize')
      } else {
        res.status(500).send('Internal Server Error')
      }
      return
    } finally {
      console.log(
        `Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`
      )
    }
  } else if (req.query.category) {
    const category = req.query.category
    res.json(await studentService.getAllStudents())
  } else {
    res.json(await studentService.getAllStudents())
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const event = await studentService.getStudentById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
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
    const newStudent: InStudent = req.body;

    // ตรวจสอบว่า req.body มีค่าหรือไม่
    if (!newStudent) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // เตรียมข้อมูล student สำหรับเพิ่ม
    const dataStudent = {
      username: newStudent.username,
      password: newStudent.password,
      student_id_card: newStudent.student_id_card,
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      picture: ouputUrl, // URL ที่ได้จากการอัปโหลดไฟล์
      department_id: Number(newStudent.department_id),
      degree_id: Number(newStudent.degree_id),
      advisor_id: Number(newStudent.advisor_id)
    };

    // เรียก service เพื่อเพิ่มข้อมูลนักศึกษา
    const result = await studentService.addStudent(dataStudent);

    // ส่งข้อมูลที่เพิ่มสำเร็จกลับไป
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding student:', error);

    // ตรวจสอบ error ที่เกิดขึ้น และส่ง response ตามกรณี
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

export default router
