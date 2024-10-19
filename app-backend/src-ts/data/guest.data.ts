export type Msg = { msg: string; }

export type Role = 'admin' | 'worker' | 'guest';

export type DataGetSession = {
    username: string;
    password: string;
}
export type DataGetSessionOk = {
    username:string;
    role:string;
}

export type User = DataGetSession & { role: Role }
