import express, { Application } from 'express';

import corsOptions from './config/cors.config';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(corsOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'welcome to the app!' });
});

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
