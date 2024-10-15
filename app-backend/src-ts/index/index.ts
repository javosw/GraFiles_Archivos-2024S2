import express, { Express, Request, Response, Application } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});