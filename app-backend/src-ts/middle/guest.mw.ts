import { Request, Response, NextFunction, RequestHandler } from "express";
import session, { SessionOptions } from 'express-session';
import { ModelGetSession, ModelGetSessionOk, modelMsg, ModelRole } from "../model/guest.model.js";

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
export const customSession = session(sessionOptions);

declare module "express-session" {
    interface SessionData {
        username: string;
        role: string;
    }
}

export async function getSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { getUser } = await import('../data/guest.data.js');
    const data = await getUser(req.db, req.body as ModelGetSession);

    if (data) {
        req.session.username = data.username;
        req.session.role = data.role;

        res.status(200).json(data);
    }
    else {
        res.status(401).json(modelMsg('401@getSession'));
    }
}

export function checkSession(roles: ModelRole[]): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {

        if (req.session.role) {

            if (roles.includes(req.session.role as ModelRole)) {
                return next();
            }

            res.status(403).json(modelMsg('403@checkSession'));
            return;

        } else {
            res.status(401).json(modelMsg('401@checkSession'));
            return;
        }
    };
};

