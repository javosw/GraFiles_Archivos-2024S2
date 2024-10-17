import express from 'express';
import cors from 'cors';
const app = express();
// ========================================================
const corsOptions = {
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
app.post('/admin', checkSession(['admin']), (req, res) => {
    res.json({ josq: 'admin' });
});
app.post('/worker', checkSession(['worker']), (req, res) => {
    res.json({ josq: 'worker' });
});
// ========================================================
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
// ========================================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
});
