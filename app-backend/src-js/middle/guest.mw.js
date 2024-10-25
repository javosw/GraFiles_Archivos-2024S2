import session from 'express-session';
import { modelMsg } from "../model/guest.model.js";
const sessionOptions = {
    secret: 'gf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    }
};
export const customSession = session(sessionOptions);
export async function getSession(req, res, next) {
    const { getUser } = await import('../data/guest.data.js');
    const data = await getUser(req.db, req.body);
    if (data) {
        req.session.username = data.username;
        req.session.role = data.role;
        res.status(200).json(data);
    }
    else {
        res.status(401).json(modelMsg('401@getSession'));
    }
}
export function checkSession(roles) {
    return (req, res, next) => {
        if (req.session.role) {
            if (roles.includes(req.session.role)) {
                return next();
            }
            res.status(403).json(modelMsg('403@checkSession'));
            return;
        }
        else {
            res.status(401).json(modelMsg('401@checkSession'));
            return;
        }
    };
}
;
