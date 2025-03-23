import type { RegisterRequest } from '../models/registerRequest'
import * as authRepository from '../repository/authRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export function findByUsername(username: string) {
  return authRepository.findByUsername(username)
}

export async function getUserFromToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload
  return await authRepository.findByUserId(decoded.userId)
}
export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function generatetoken(userId: number) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export function registerAdmin(registerRequest: RegisterRequest) {
  const { user_role_id, username, password } = registerRequest
  return authRepository.registerAdmin(
    user_role_id,
    username,
    bcrypt.hashSync(password)
  )
}

export function updatePassword(userId: number, password: string) {
  return authRepository.updatePassword(userId, bcrypt.hashSync(password))
}
