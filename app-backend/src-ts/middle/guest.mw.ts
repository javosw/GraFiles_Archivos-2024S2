import { Request, Response, NextFunction } from "express";
import session, { SessionOptions } from 'express-session';


const sessionOptions:SessionOptions = {
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

type Status = {
    http: number;
    at: string;
}


declare module "express-session" {
    interface SessionData {
        username:string;
        role:string;
    }
}

export const getSession = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    let {getUser} = await import('../model/guest.model.js');
    const data = await getUser(username, password);

    //res.setHeader('Content-Type', 'application/json');
    if (data) {
        req.session.username = username;
        req.session.role = data.role;

        res.status(200).json(data);
    }
    else {
        res.status(401).send();
    }
}

// si tiene algun rol... puede acceder a las rutas...  = mwRolX,mwRutasRolX

export const checkSession = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction):void => {

        if (req.session.role) {

            if(roles.includes(req.session.role)){
                return next();
            }

            let status: Status = { http: 403, at: '' };
            res.status(403).json(status);
            return;

        } else {
            let status: Status = { http: 401, at: '' };
            res.status(401).json(status);
            return;
        }
    };
};
