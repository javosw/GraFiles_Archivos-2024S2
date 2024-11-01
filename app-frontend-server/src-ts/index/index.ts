import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();

// ========================================================

const publicPath: string = path.join(process.cwd(), 'public', 'browser');
app.use(express.static(publicPath));

app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath);
});

// ========================================================

const PORT = 4200;

app.listen(PORT, () => {
    console.log(`[express] http://localhost:${PORT}`);
})

