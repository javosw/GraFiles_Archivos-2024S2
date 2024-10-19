import session from 'express-session';
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
export let customSession = session(sessionOptions);
export const checkSession = (roles) => {
    return (req, res, next) => {
        if (req.session.role) {
            if (roles.includes(req.session.role)) {
                return next();
            }
            let status = { msg: '403@checkSession' };
            res.status(403).json(status);
            return;
        }
        else {
            let status = { msg: '401@checkSession' };
            res.status(401).json(status);
            return;
        }
    };
};
export const getSession = async (req, res, next) => {
    const { getUser } = await import('../model/guest.model.js');
    const data = await getUser(req.body);
    if (data) {
        req.session.username = data.username;
        req.session.role = data.role;
        res.status(200).json(data);
    }
    else {
        res.status(401).send();
    }
};
