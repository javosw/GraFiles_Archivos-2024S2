import { ObjectId } from "mongodb"

export type ModelTrashFolder = {
    _id: string,
    name: string,
    files: ObjectId[]
}