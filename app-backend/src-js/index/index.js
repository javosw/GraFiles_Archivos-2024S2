import express from 'express';
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
