import { ObjectId } from 'mongodb';

export type ModelFolder = {
    _id: ObjectId,
    name: String,
    ancestor: ObjectId | null,
    folders: ObjectId[],
    files: ObjectId[]
}

export type ModelFile = {
    _id: ObjectId,
    name: String,
    type: 'text' | 'image',
    ancestor: ObjectId,
    content: String, 
}
