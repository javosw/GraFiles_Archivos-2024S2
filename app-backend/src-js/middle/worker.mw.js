import { ObjectId } from "mongodb";
import { modelMsg } from "../model/guest.model.js";
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
        res.status(401).json(modelMsg('401@getFolder'));
        return;
    }
}
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
        res.status(401).json(modelMsg('401@addFolder'));
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
        res.status(401).json(modelMsg('401@getFile'));
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
        res.status(401).json(modelMsg('401@addFile'));
        return;
    }
}
