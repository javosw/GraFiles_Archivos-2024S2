export type ModelFolder = {
    _id: string,
    name: string,
    ancestor: string | null,
    folders: string[],
    files: string[]
}

export type ModelSharedFolder = {
    _id: string,
    name: string,
    files: { idFile: string, fromUser: string }[]
}

export type ModelFile = {
    _id: string,
    ancestor: string,
    originalname: string,
    mimetype: string,
    path: string
}

