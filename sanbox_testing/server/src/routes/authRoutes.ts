import * as authService from '../services/authService'
import * as authMiddleware from '../middleware/authMiddleware'
import express, { Request, Response } from 'express'
import type { user_role } from '@prisma/client'
import type { RegisterRequest } from '../models/registerRequest'

const router = express.Router()

router.get('/me', authMiddleware.protect, async (req, res) => {
  const user = req.body.user
  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      username: user.username,
      user_role: user.user_role,
    },
  })
})

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body
  const user = await authService.findByUsername(username)
  if (!user) {
    res.status(401).json({ message: "User doesn't exist" })
    return
  }

  if (!password || !user.password) {
    res.status(400).json({ message: 'Password is required' })
    return
  }

  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password
  )
  if (!isPasswordCorrect) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }

  const token = authService.generatetoken(user.id)
  res.status(200).json({
    status: 'success',
    access_token: token,
    user: {
      id: user.id,
      username: user.username || 'unknown',
      role: user.user_role ? user.user_role.role_name : 'unknown',
    },
  })
  return
})

router.post(
  '/checkRole',
  authMiddleware.protect,
  authMiddleware.checkRole,
  async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'You are an authen',
    })
  }
)

router.post('/register', async (req, res) => {
  const registerRequest: RegisterRequest = req.body
  try {
    const responseUser = await authService.registerAdmin(registerRequest)
    res.status(201).json({
      status: 'success',
      user: {
        id: responseUser.id,
        username: responseUser.username,
        role: responseUser ? responseUser.user_role_id : 'unknown',
      },
    })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})

router.post('/updatePassword', authMiddleware.protect, async (req, res) => {
  const user = req.body.user
  const { password } = req.body
  try {
    await authService.updatePassword(user.id, password)
    res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles.map((role: user_role) => role.role_name),
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})

export default router
