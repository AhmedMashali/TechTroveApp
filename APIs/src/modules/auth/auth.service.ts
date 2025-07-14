import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Response } from 'express';

import { AuthResponse, UserPayload } from './auth.types';
import { User } from '../users/user.model';
import * as userService from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '../../utils/cookie';
import { env } from '../../config/env.config';
import { AppError } from '../../utils/app-error';

export const register = async (
    registerDto: RegisterDto,
    res: Response
): Promise<Omit<AuthResponse, 'refreshToken'>> => {
    try {
        const { username, password } = registerDto;
        const newUser = await userService.createUser({ username, password });

        const payload = { _id: newUser._id, username: newUser.username };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        newUser.refreshToken = await bcrypt.hash(refreshToken, 10);
        await newUser.save();

        setRefreshTokenCookie(res, refreshToken);

        return {
            accessToken,
            user: { _id: newUser._id, username: newUser.username }
        };
    } catch (error) {
        throw error;
    }
};

export const login = async (
    loginDto: LoginDto,
    res: Response
): Promise<Omit<AuthResponse, 'refreshToken'>> => {
    try {
        const user = await User.findOne({ username: loginDto.username })
            .select({ password: 1, refreshToken: 1 })
            .exec();
        if (!user) throw new AppError('Invalid credentials', 401);

        const isMatch = await user.comparePassword(loginDto.password);
        if (!isMatch) throw new AppError('Invalid credentials', 401);

        const payload = { _id: user._id, username: user.username };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        user.refreshToken = await bcrypt.hash(refreshToken, 10);
        await user.save();

        setRefreshTokenCookie(res, refreshToken);

        return {
            accessToken,
            user: { _id: user._id, username: user.username }
        };
    } catch (error) {
        throw error;
    }
};

export const refreshTokens = async (
    refreshToken: string,
    res: Response
): Promise<Omit<AuthResponse, 'refreshToken'>> => {
    if (!refreshToken) throw new AppError('No refresh token provided', 401);
    let payload: UserPayload;
    try {
        payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET!) as UserPayload;
    } catch {
        throw new AppError('Invalid refresh token', 401);
    }

    const user = await User.findById(payload._id).select({ refreshToken: 1, username: 1 }).exec();

    if (!user || !user.refreshToken) {
        throw new AppError('Invalid refresh token', 401);
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
        throw new AppError('Invalid refresh token', 401);
    }

    const newPayload: UserPayload = {
        _id: user._id,
        username: user.username
    };

    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    setRefreshTokenCookie(res, newRefreshToken);

    return {
        accessToken: newAccessToken,
        user: {
            _id: user._id,
            username: user.username
        }
    };
};

export const logout = async (userId: string, res: Response) => {
    const user = await User.findById(userId).exec();
    if (!user) throw new AppError('Unauthorized', 401);

    user.refreshToken = '';
    await user.save();

    clearRefreshTokenCookie(res);
};
