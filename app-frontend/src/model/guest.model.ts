export type ModelRole = 'admin' | 'worker' | 'guest';

export type ModelGetSession = {
    username: string;
    password: string;
}

export type ModelGetSessionOk = {
    username: string;
    role: ModelRole;
    folderRoot: string;
    folderShared: string;
}

