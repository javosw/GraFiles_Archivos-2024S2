export let api: string = 'http://localhost:3000';

export let apiGuestAddSesion: string = 'http://localhost:3000/session/get';
export let apiGuestAddWorker: string = '';
export let apiGuestGetWorker: string = '';


export let apiWorkerAddFolder = 'http://localhost:3000/folders/add';
export let apiWorkerGetFolder = 'http://localhost:3000/folders/get';
export let apiWorkerGetFile = 'http://localhost:3000/files/get';
export let apiWorkerAddFile = 'http://localhost:3000/files/add';

export function apiWorkerOpenFile(folder: string, file: string): string {
    return `http://localhost:3000/files/open?folder=${folder}&file=${file}`;
}
