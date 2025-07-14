import { Response } from 'express';

export const setRefreshTokenCookie = (res: Response, token: string): void => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/api/auth/refresh-token',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

export const clearRefreshTokenCookie = (res: Response): void => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/api/auth/refresh-token'
    });
};
