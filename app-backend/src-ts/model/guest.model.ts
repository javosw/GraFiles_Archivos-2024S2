import { ObjectId } from "mongodb";

export type ModelMsg = { msg: string; }
export function modelMsg(msg: string): ModelMsg {
    return { msg };
}

export type ModelRole = 'admin' | 'worker' | 'guest';

export type ModelGetSession = {
    username: string;
    password: string;
}
export type ModelGetSessionOk = {
    username: string;
    role: ModelRole;
    folderRoot: ObjectId;
    folderShared: ObjectId;
}
