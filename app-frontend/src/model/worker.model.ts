export type ModelFolder = {
    _id: string,
    name: String,
    ancestor: string | null,
    folders: string[],
    files: string[]
}

export type ModelFile = {
    _id: string,
    name: String,
    type: 'text' | 'image',
    ancestor: string,
    content: String, 
}