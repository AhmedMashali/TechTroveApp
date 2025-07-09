import express, { Application } from 'express';

import corsOptions from './config/cors.config';

const app: Application = express();

app.use(corsOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.status(200).json({ msg: 'welcome to the app!' });
});

export default app;
