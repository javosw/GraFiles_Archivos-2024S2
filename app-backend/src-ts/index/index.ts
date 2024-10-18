import express, { Express, Request, Response, Application } from 'express';
import cors, { CorsOptions } from 'cors';

const app: Express = express();

// ========================================================

const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
const customCors = cors(corsOptions);
app.use(customCors);

// ========================================================

const { customSession } = await import('../middle/guest.mw.js');
app.use(customSession);

// ========================================================

const { getSession } = await import('../middle/guest.mw.js');
app.post('/get-session', express.json(), getSession);

// ========================================================

// ========================================================


// ========================================================
const { checkSession } = await import('../middle/guest.mw.js');

app.get('/test-admin', checkSession(['admin']), (req: Request, res: Response) => {
    res.json({ josq: 'admin' });
});

app.get('/test-worker', checkSession(['worker']), (req: Request, res: Response) => {
    res.json({ josq: 'worker' });
});

app.get('/test-roles', checkSession(['worker','admin']), (req: Request, res: Response) => {
    res.json({ josq: 'roles' });
});

app.get('/test-guest', (req: Request, res: Response) => {
    res.status(401).json({ josq: 'guest' });
});

// ========================================================

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// ========================================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
})
