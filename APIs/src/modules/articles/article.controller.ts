import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../../utils/api-response';
import * as articlesService from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UserDocument } from '../users/user.model';
import { UpdateArticleDto } from './dto/update-article.dto';

export const createArticle = async (
    req: Request<{}, {}, CreateArticleDto>,
    res: Response,
    next: NextFunction
) => {
    try {
        const article = await articlesService.createArticle(req.body, req.user as UserDocument);
        return successResponse(res, { article }, 'Article is created successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const getSingleArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await articlesService.getSingleArticle(req.params._id);
        return successResponse(res, { article }, 'Article is fetched successfully', 200);
    } catch (error) {
        next(error);
    }
};

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await articlesService.getArticleList(req.query);
        return successResponse(res, { articles }, 'Articles are fetched successfully', 201);
    } catch (error: any) {
        next(error);
    }
};

export const updateArticle = async (
    req: Request<{}, {}, UpdateArticleDto>,
    res: Response,
    next: NextFunction
) => {
    try {
        const article = await articlesService.updateArticle(req.body, req.user as UserDocument);
        return successResponse(res, { article }, 'Article is updated successfully', 200);
    } catch (error) {
        next(error);
    }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await articlesService.deleteArticle(req.params, req.user as UserDocument);
        return successResponse(res, null, 'Article is deleted successfully', 200);
    } catch (error) {
        next(error);
    }
};
