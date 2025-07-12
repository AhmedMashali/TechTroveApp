import express, { Application } from 'express';

import corsOptions from './config/cors.config';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { passportInitialize } from './config/passport.config';
import routes from './modules';

const app: Application = express();

app.use(corsOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportInitialize);

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
