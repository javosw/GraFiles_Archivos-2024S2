import { gfDb } from '../data/db.js';
import { modelMsg } from '../model/guest.model.js';
export const requestWithDb = async (req, res, next) => {
    try {
        req.db = await gfDb();
        next();
    }
    catch (error) {
        res.status(500).json(modelMsg('500@dbMiddleware'));
    }
};
