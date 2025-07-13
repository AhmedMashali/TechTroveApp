import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/api-response';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    errorResponse(res, 'Endpoint not found', 404);
};
