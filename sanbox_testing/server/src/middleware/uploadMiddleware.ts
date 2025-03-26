import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { uploadFile } from '../services/uploadFileService';

// Define bucket and file paths
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'advisor-system';
const PROFILE_PATH = 'profiles';
const ANNOUNCEMENT_PATH = 'announcements';

// Configure storage for profile pictures
const profilePictureStorage = multer.memoryStorage();
const profilePictureUpload = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).single('picture');

// Configure storage for announcement files
const announcementFileStorage = multer.memoryStorage();
const announcementFileUpload = multer({
  storage: announcementFileStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  }
}).single('file');

export const uploadProfilePicture = (req: Request, res: Response, next: NextFunction) => {
  profilePictureUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ 
        status: 'error',
        message: `Upload error: ${err.message}` 
      });
    } else if (err) {
      return res.status(400).json({ 
        status: 'error',
        message: `${err.message}` 
      });
    }
    next();
  });
};

export const uploadAnnouncementFile = (req: Request, res: Response, next: NextFunction) => {
  announcementFileUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ 
        status: 'error',
        message: `Upload error: ${err.message}` 
      });
    } else if (err) {
      return res.status(400).json({ 
        status: 'error',
        message: `${err.message}` 
      });
    }
    next();
  });
};

export const saveProfilePicture = async (file: Express.Multer.File): Promise<string> => {
  try {
    // Use uploadFile from uploadFileService instead
    return await uploadFile(BUCKET_NAME, PROFILE_PATH, file);
  } catch (error) {
    console.error('Error saving profile picture:', error);
    throw error;
  }
};

export const saveAnnouncementFile = async (file: Express.Multer.File): Promise<string> => {
  try {
    // Use uploadFile from uploadFileService instead
    return await uploadFile(BUCKET_NAME, ANNOUNCEMENT_PATH, file);
  } catch (error) {
    console.error('Error saving announcement file:', error);
    throw error;
  }
};