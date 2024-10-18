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

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// ========================================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
})
