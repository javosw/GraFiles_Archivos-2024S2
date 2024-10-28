export let api: string = 'http://localhost:3000';

export let apiGuestAddSesion: string = 'http://localhost:3000/session/get';


export let apiWorkerAddFolder = 'http://localhost:3000/folders/add';
export let apiWorkerGetFolder = 'http://localhost:3000/folders/get';
export let apiWorkerGetSharedFolder = 'http://localhost:3000/shared-folders/get';
export let apiWorkerGetTrashFolder = 'http://localhost:3000/trash-folder/get';
export let apiWorkerGetFile = 'http://localhost:3000/files/get';
export let apiWorkerAddFile = 'http://localhost:3000/files/add';
export let apiWorkerShareFile = 'http://localhost:3000/files/share';
export let apiWorkerDelFile = 'http://localhost:3000/files/del';

export function apiWorkerOpenFile(folder: string, file: string): string {
    return `http://localhost:3000/files/open?folder=${folder}&file=${file}`;
}

export let apiAdminAddUser: string = 'http://localhost:3000/users/add';
export let apiAdminCheckUser: string = 'http://localhost:3000/users/check';
