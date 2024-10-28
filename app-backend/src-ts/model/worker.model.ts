import { ObjectId } from 'mongodb';

export type ModelFolder = {
    _id: ObjectId,
    name: String,
    ancestor: ObjectId | null,
    folders: ObjectId[],
    files: ObjectId[]
}

export type ModelFileOk = {
    _id: string,
    ancestor: string,
    originalname: string,
    mimetype: string,
    path: string
}
export type ModelFile = {
    _id: ObjectId,
    ancestor: ObjectId,
    file: {
        originalname: string,
        mimetype: string,
        path: string
    }
}

export type ModelSharedFolder = {
    _id: ObjectId,
    name: string,
    files: { idFile: ObjectId, fromUser: string }[]
}
