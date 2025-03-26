import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import multer from 'multer';
import routes from './routes';
import { uploadFile } from './services/uploadFileService';

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://713-2024-frontend-example-one.vercel.app'];
const options: cors.CorsOptions = { origin: allowedOrigins};

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    
    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;
    
    if (!bucket || !filePath) {
      return res.status(500).send('Bucket name or file path not configured.');
    }
    
    const ouputUrl = await uploadFile(bucket, filePath, file);
    
    res.status(200).send(ouputUrl);
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});

