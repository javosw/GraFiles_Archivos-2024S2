import express from 'express';
import cors from 'cors';
import { checkSession } from '../middle/guest.mw.js';
import { requestWithDb } from '../middle/db.mw.js';
import { mongoClient } from '../data/db.js';
const app = express();
// ========================================================
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
const customCors = cors(corsOptions);
app.use(customCors);
app.use(express.json());
app.use(requestWithDb);
const { customSession } = await import('../middle/guest.mw.js');
app.use(customSession);
// ========================================================
const { getSession } = await import('../middle/guest.mw.js');
app.post('/session/get', getSession);
// ========================================================
const { getFolder } = await import('../middle/worker.mw.js');
app.post('/folders/get', checkSession(['admin', 'worker']), getFolder);
// ========================================================
const { getFile } = await import('../middle/worker.mw.js');
app.post('/files/get', checkSession(['admin', 'worker']), getFile);
// ========================================================
const { addFolder } = await import('../middle/worker.mw.js');
app.post('/folders/add', checkSession(['admin', 'worker']), addFolder);
// ========================================================
import { addFile } from '../middle/worker.mw.js';
import { customMulter } from '../middle/files.mw.js';
app.post('/files/add', checkSession(['admin', 'worker']), customMulter.single('file'), addFile);
// ========================================================
import { openFile } from '../middle/worker.mw.js';
app.get('/files/open', checkSession(['admin', 'worker']), openFile);
// ========================================================
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
// ========================================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
});
const listener = async (signal) => {
    if (mongoClient) {
        await mongoClient.close();
    }
    console.log('[mongodb] MongoClient.close()');
    process.exit(0);
};
process.on('SIGINT', listener);
process.on('SIGTERM', listener);
