import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { UserPayload } from '../modules/auth/auth.types';

export const generateAccessToken = (payload: UserPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRE
    });
};

export const generateRefreshToken = (payload: UserPayload): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRE
    });
};
