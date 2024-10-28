import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { modelMsg, ModelMsg } from "../model/guest.model.js";
import path from 'path';
import { SharedFolder } from "../model/worker.model.js";

export async function getFolder(req: Request, res: Response, next: NextFunction) {
    const { getFolder } = await import('../data/worker.data.js');
    let bodyReq = req.body as { _id: string };
    const data = await getFolder(req.db, { _id: new ObjectId(bodyReq._id) });

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
        res.status(400).json(modelMsg('400@getFolder'));
        return;
    }
}

export const getSharedFolder = async (req: Request, res: Response, next: NextFunction) => {
    const { getSharedFolder } = await import('../data/worker.data.js');

    const _id: string = req.body._id;
    const value: SharedFolder | null = await getSharedFolder(req.db, { _id: new ObjectId(_id) });

    if (value) {
        let files: { idFile: string; fromUser: string; }[] = [];
        value.files.forEach((file) => {
            files.push({
                idFile: file.idFile?.toString(),
                fromUser: file.fromUser
            });
        });

        let bodyRes = {
            _id: value._id.toString(),
            name: value.name,
            files
        }

        console.log(bodyRes);
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMsg('400@getFolder'));
        return;
    }
}

export async function addFolder(req: Request, res: Response, next: NextFunction) {
    const { addFolder } = await import('../data/worker.data.js');
    let bodyReq = req.body as { ancestor: string, name: string };
    const data = await addFolder(req.db, { ancestor: new ObjectId(bodyReq.ancestor), name: bodyReq.name });

    if (data) {
        let bodyRes = {
            _id: data.toString()
        }
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMsg('400@addFolder'));
        return;
    }
}

export async function getFile(req: Request, res: Response, next: NextFunction) {
    const { getFile } = await import('../data/worker.data.js');
    let bodyReq = req.body as { _id: string };
    const data = await getFile(req.db, { _id: new ObjectId(bodyReq._id) });

    if (data) {

        let bodyRes = {
            _id: data._id.toString(),
            ancestor: data.ancestor.toString(),
            originalname: data.file.originalname,
            mimetype: data.file.mimetype,
            path: data.file.path
        }

        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMsg('400@getFile'));
        return;
    }
}

export async function addFile(req: Request, res: Response, next: NextFunction) {
    const { addFile } = await import('../data/worker.data.js');

    const data = await addFile(req.db, { ancestor: new ObjectId(req.body.ancestor as string), file: req.file as Express.Multer.File });

    if (data) {
        let bodyRes = {
            _id: data.toString()
        }
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMsg('400@addFile'));
        return;
    }
}

export async function openFile(req: Request, res: Response, next: NextFunction) {
    const { folder, file } = req.query;
    const filePath = path.join(process.cwd(), 'files', `${folder}`, `${file}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('500@openFile');
        }
    });
}

export const shareFile = async (req: Request, res: Response, next: NextFunction) => {
    const { idFile, fromUser, toUser } = req.body;
    const { shareFile } = await import('../data/worker.data.js');
    let value: number = await shareFile(req.db, { idFile, fromUser, toUser });

    if (value == 1) {
        res.status(200).json(modelMsg('200@shareFile'));
    }
    else {
        res.status(400).json(modelMsg('400@shareFile'));
        return;
    }
}

export const delFile = async (req: Request, res: Response, next: NextFunction) => {
    const idFile: string = req.body.idFile;
    const { delFile } = await import('../data/worker.data.js');
    let value: number = await delFile(req.db, { idFile: new ObjectId(idFile) });

    if (value == 1) {
        res.status(200).json(modelMsg('200@delFile'));
    }
    else {
        res.status(400).json(modelMsg('400@delFile'));
        return;
    }
}
