import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/api-response';

export function validateDto(dtoClass: any, source: 'body' | 'params' | 'query' = 'body') {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = req[source];

        const dtoObject = plainToInstance(dtoClass, data);
        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            const messages = errors
                .flatMap(error => (error.constraints ? Object.values(error.constraints) : []))
                .join(', ');

            errorResponse(res, messages, 400);
            return;
        }

        Object.assign(req[source], dtoObject);
        next();
    };
}
