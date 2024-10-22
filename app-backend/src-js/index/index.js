import express from 'express';
import cors from 'cors';
import { checkSession } from '../middle/guest.mw.js';
const app = express();
// ========================================================
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
const customCors = cors(corsOptions);
app.use(customCors);
app.use(express.json());
// ========================================================
const { customSession } = await import('../middle/guest.mw.js');
app.use(customSession);
// ========================================================
const { getSession } = await import('../middle/guest.mw.js');
app.post('/session/get', getSession);
// ========================================================
const { getFolder } = await import('../middle/worker.mw.js');
app.post('/folders/get', checkSession(['admin', 'worker']), getFolder);
// ========================================================
const { addFolder } = await import('../middle/worker.mw.js');
app.post('/folders/add', checkSession(['admin', 'worker']), addFolder);
// ========================================================
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
// ========================================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
});
