export type DataAddSession = {
    username:string;
    password:string;
}

export type DataSession = {
    username:string;
    role:string;
}

export type Role = 'admin' | 'worker' | 'guest';