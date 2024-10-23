import { gfDb } from '../data/db.js';
export const requestWithDb = async (req, res, next) => {
    try {
        req.db = await gfDb();
        next();
    }
    catch (error) {
        res.status(500).json({ msg: '500@dbMiddleware' });
    }
};
