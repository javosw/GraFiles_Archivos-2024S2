export type ModelFolder = {
    _id: string,
    name: string,
    ancestor: string | null,
    folders: string[],
    files: string[]
}

export type ModelFile = {
    _id: string,
    ancestor: string,
    name: string,
    mimetype: 'text' | 'image',
    content: string, 
}