import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.status(200).json({ msg: 'welcome to the app!' });
});

export default app;
