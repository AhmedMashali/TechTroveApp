import { NextFunction, Request, Response } from 'express';
import * as authService from './auth.service';
import { successResponse } from '../../utils/api-response';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export const registerUser = async (
    req: Request<{}, {}, RegisterDto>,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await authService.register(req.body, res);
        successResponse(res, response, 'User registered successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request<{}, {}, LoginDto>,
    res: Response,
    next: NextFunction
) => {
    try {
        const loginRes = await authService.login(req.body, res);
        successResponse(res, loginRes, 'Login successful');
    } catch (error: any) {
        next(error);
    }
};

export const refreshUserToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const refreshRes = await authService.refreshTokens(refreshToken, res);
        successResponse(res, refreshRes, 'Token refreshed');
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('req.user', req.user);
        const userId = (req as any).user._id;
        console.log('userId', userId);
        await authService.logout(userId, res);
        successResponse(res, null, 'Logged out');
    } catch (error) {
        next(error);
    }
};
