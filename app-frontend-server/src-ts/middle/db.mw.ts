import { Request, Response, NextFunction } from 'express';
import { Db } from 'mongodb';
import { gfDb } from '../data/db.js';
import { modelMessage } from '../model/guest.model.js';

declare global {
  namespace Express {
    interface Request {
      db: Db;
    }
  }
}

export const requestWithDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.db = await gfDb();
    next();
  } catch (error) {
    res.status(500).json(modelMessage('500@dbMiddleware'));
  }
};
