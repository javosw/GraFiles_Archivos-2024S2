import { ObjectId } from "mongodb";

export type ModelMessage = { at: string; }
export function modelMessage(message: string): ModelMessage {
    return { at: message };
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
