import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/api-response';
import { AppError } from '../utils/app-error';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    let { message, statusCode } = err;

    if (!err.statusCode) {
        message = 'Internal server error';
        statusCode = 500;
        console.error(err.stack);
    }

    errorResponse(res, message, statusCode);
};
