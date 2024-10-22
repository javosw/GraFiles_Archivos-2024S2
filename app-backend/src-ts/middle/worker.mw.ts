import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

export async function getFolder(req: Request, res: Response, next: NextFunction) {
    const { getFolder } = await import('../data/worker.data.js');
    let bodyReq = req.body as { _id: string };
    const data = await getFolder({ _id: new ObjectId(bodyReq._id) });

    if (data) {
        let folders: string[] = [];
        data.folders.forEach((folder) => { folders.push(folder.toString()); })
        let files: string[] = [];
        data.files.forEach((file) => { files.push(file.toString()); })

        let bodyRes = {
            _id: data._id.toString(),
            name: data.name,
            ancestor: data.ancestor?.toString() || null,
            folders,
            files
        }

        res.status(200).json(bodyRes);
    }
    else {
        res.status(401).send();
    }

}