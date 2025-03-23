import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import studentRoute from './routes/studentRoute'
import authRoutes from './routes/authRoutes'
import advisorRoutes from './routes/advisorRoutes'
import departmentRoutes from './routes/departmentRoutes'
import degreeRoutes from './routes/degreeRoutes'

const port = process.env.PORT || 3000
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/students', studentRoute)
app.use('/auth', authRoutes)
app.use('/advisors', advisorRoutes)
app.use('/departments', departmentRoutes)
app.use('/degrees', degreeRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to the Backend API!',
    timestamp: new Date().toISOString(),
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
