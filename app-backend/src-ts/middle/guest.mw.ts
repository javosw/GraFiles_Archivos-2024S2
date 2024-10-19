import { Request, Response, NextFunction } from "express";
import session, { SessionOptions } from 'express-session';
import { DataGetSession, DataGetSessionOk, Msg, Role } from "../data/guest.data.js";

const sessionOptions: SessionOptions = {
    secret: 'gf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    }
}
export let customSession = session(sessionOptions);

declare module "express-session" {
    interface SessionData {
        username: string;
        role: string;
    }
}

export const checkSession = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {

        if (req.session.role) {

            if (roles.includes(req.session.role as Role)) {
                return next();
            }

            let status: Msg = { msg: '403@checkSession' };
            res.status(403).json(status);
            return;

        } else {
            let status: Msg = { msg: '401@checkSession' };
            res.status(401).json(status);
            return;
        }
    };
};

export const getSession = async (req: Request, res: Response, next: NextFunction) => {
    const { getUser } = await import('../model/guest.model.js');
    const data = await getUser(req.body as DataGetSession);

    if (data) {
        req.session.username = data.username;
        req.session.role = data.role;

        res.status(200).json(data);
    }
    else {
        res.status(401).send();
    }
}
