import { ObjectId } from "mongodb";
import { modelMessage } from "../model/guest.model.js";
import path from 'path';
export async function getFolder(req, res, next) {
    const { getFolder } = await import('../data/worker.data.js');
    let bodyReq = req.body;
    const data = await getFolder(req.db, { _id: new ObjectId(bodyReq._id) });
    if (data) {
        let folders = [];
        data.folders.forEach((folder) => { folders.push(folder.toString()); });
        let files = [];
        data.files.forEach((file) => { files.push(file.toString()); });
        let bodyRes = {
            _id: data._id.toString(),
            name: data.name,
            ancestor: data.ancestor?.toString() || null,
            folders,
            files
        };
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMessage('400@getFolder'));
        return;
    }
}
export const getSharedFolder = async (req, res, next) => {
    const { getSharedFolder } = await import('../data/worker.data.js');
    const _id = req.body._id;
    const value = await getSharedFolder(req.db, { _id: new ObjectId(_id) });
    if (value) {
        let files = [];
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
        };
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMessage('400@getFolder'));
        return;
    }
};
export async function addFolder(req, res, next) {
    const { addFolder } = await import('../data/worker.data.js');
    let bodyReq = req.body;
    const data = await addFolder(req.db, { ancestor: new ObjectId(bodyReq.ancestor), name: bodyReq.name });
    if (data) {
        let bodyRes = {
            _id: data.toString()
        };
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMessage('400@addFolder'));
        return;
    }
}
export async function getFile(req, res, next) {
    const { getFile } = await import('../data/worker.data.js');
    let bodyReq = req.body;
    const data = await getFile(req.db, { _id: new ObjectId(bodyReq._id) });
    if (data) {
        let bodyRes = {
            _id: data._id.toString(),
            ancestor: data.ancestor.toString(),
            originalname: data.file.originalname,
            mimetype: data.file.mimetype,
            path: data.file.path
        };
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMessage('400@getFile'));
        return;
    }
}
export async function addFile(req, res, next) {
    const { addFile } = await import('../data/worker.data.js');
    const data = await addFile(req.db, { ancestor: new ObjectId(req.body.ancestor), file: req.file });
    if (data) {
        let bodyRes = {
            _id: data.toString()
        };
        res.status(200).json(bodyRes);
    }
    else {
        res.status(400).json(modelMessage('400@addFile'));
        return;
    }
}
export async function openFile(req, res, next) {
    const { folder, file } = req.query;
    const filePath = path.join(process.cwd(), 'files', `${folder}`, `${file}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('500@openFile');
        }
    });
}
export const shareFile = async (req, res, next) => {
    const { idFile, fromUser, toUser } = req.body;
    const { shareFile } = await import('../data/worker.data.js');
    let value = await shareFile(req.db, { idFile, fromUser, toUser });
    if (value == 1) {
        res.status(200).json(modelMessage('200@shareFile'));
    }
    else {
        res.status(400).json(modelMessage('400@shareFile'));
        return;
    }
};
export const delFile = async (req, res, next) => {
    const idFile = req.body.idFile;
    const { delFile } = await import('../data/worker.data.js');
    let value = await delFile(req.db, { idFile: new ObjectId(idFile) });
    if (value == 1) {
        res.status(200).json(modelMessage('200@delFile'));
    }
    else {
        res.status(400).json(modelMessage('400@delFile'));
        return;
    }
};
