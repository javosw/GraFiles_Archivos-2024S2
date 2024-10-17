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
export const getSession = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let { getUser } = await import('../model/guest.model.js');
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
};
// si tiene algun rol... puede acceder a las rutas...  = mwRolX,mwRutasRolX
export const checkSession = (roles) => {
    return (req, res, next) => {
        if (req.session.role) {
            if (roles.includes(req.session.role)) {
                return next();
            }
            let status = { http: 403, at: '' };
            res.status(403).json(status);
            return;
        }
        else {
            let status = { http: 401, at: '' };
            res.status(401).json(status);
            return;
        }
    };
};
