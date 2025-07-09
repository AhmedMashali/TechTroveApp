import cors from 'cors';
import { env } from './env.config';

const corsSettings = {
    origin: env.ORIGINS,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
};

export const corsOptions = corsSettings;
export default cors(corsSettings);
