import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

export async function getFolder(req: Request, res: Response, next: NextFunction) {
    const { getFolder } = await import('../data/worker.data.js');
    const data = await getFolder(req.body as { _id: ObjectId });

    if (data) {
        res.status(200).json(data);
    }
    else {
        res.status(401).send();
    }

}