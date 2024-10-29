import express from 'express';
import path from 'path';
const app = express();
// ========================================================
const publicPath = path.join(process.cwd(), 'public', 'browser');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath);
});
// ========================================================
const PORT = 4200;
app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
});
