import express, { Express, Request, Response, Application } from 'express';
import cors, { CorsOptions } from 'cors';
import { checkSession } from '../middle/guest.mw.js';
import { requestWithDb } from '../middle/db.mw.js';
import { mongoClient } from '../data/db.js';

const app: Express = express();

// ========================================================

const corsOptions: CorsOptions = {
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

const { getSharedFolder } = await import('../middle/worker.mw.js');
app.post('/shared-folders/get', checkSession(['admin', 'worker']), getSharedFolder);

// ========================================================

const { getTrashFolder } = await import('../middle/admin.mw.js');
app.get('/trash-folder/get', checkSession(['admin']), getTrashFolder);

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

import { shareFile } from '../middle/worker.mw.js';
app.post('/files/share', checkSession(['admin', 'worker']), shareFile);

// ========================================================

import { delFile } from '../middle/worker.mw.js';
app.post('/files/del', checkSession(['admin', 'worker']), delFile);

// ========================================================

import { addUser } from '../middle/admin.mw.js';
app.post('/users/add', checkSession(['admin']), addUser);

// ========================================================

import path from 'path';

const publicPath: string = path.join(process.cwd(), 'dist', 'public');
app.use(express.static(publicPath));

app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath);
});

// ========================================================

const PORT = process.env.PORT_BACKEND || 3000;

app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
})

const listener: NodeJS.SignalsListener = async (signal: NodeJS.Signals) => {
    if (mongoClient) {
        await mongoClient.close();
    }
    console.log('[mongodb] MongoClient.close()');
    process.exit(0);
}

process.on('SIGINT', listener);
process.on('SIGTERM', listener);