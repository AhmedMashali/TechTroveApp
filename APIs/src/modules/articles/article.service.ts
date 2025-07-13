import { Article, ArticleDocument } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { UserDocument } from '../users/user.model';
import { AppError } from '../../utils/appError';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetSingleArticleDto } from './dto/get-single-article.dto';
import { GetArticleListDto } from './dto/get-article-list.dto';

export const createArticle = async (
    createArticleDto: CreateArticleDto,
    currentUser: UserDocument
): Promise<ArticleDocument> => {
    try {
        const newArticle = new Article({
            title: createArticleDto.title,
            description: createArticleDto.description,
            content: createArticleDto.content,
            author: currentUser._id
        });

        return await newArticle.save();
    } catch (error) {
        throw error;
    }
};

export const getSingleArticle = async (articleId: string): Promise<ArticleDocument> => {
    try {
        const article = await Article.findById(articleId).lean().exec();
        if (!article) throw new AppError('This article does not exist', 404);
        return article;
    } catch (error) {
        throw error;
    }
};

export const getArticleList = async (
    getArticleListDto: any
): Promise<{ articles: ArticleDocument[] }> => {
    try {
        const page = getArticleListDto.page || 1;
        const limit = getArticleListDto.limit || 10;
        const skipArticles = (page - 1) * limit;
        const articles = await Article.find()
            .sort({ createdAt: -1 })
            .skip(skipArticles)
            .limit(limit)
            .lean()
            .exec();
        return { articles };
    } catch (error) {
        throw error;
    }
};

export const updateArticle = async (
    updateArticleDto: UpdateArticleDto,
    currentUser: UserDocument
): Promise<ArticleDocument> => {
    try {
        const articleToUpdate = await Article.findById(updateArticleDto._id).exec();

        if (!articleToUpdate) throw new AppError('This article does not exist', 404);
        if (articleToUpdate.author.toString() !== currentUser._id.toString())
            throw new AppError('This user cannot update this article', 403);

        articleToUpdate.title = updateArticleDto.title;
        articleToUpdate.description = updateArticleDto.description;
        articleToUpdate.content = updateArticleDto.content;

        return await articleToUpdate.save();
    } catch (error) {
        throw error;
    }
};

export const deleteArticle = async (data: any, currentUser: UserDocument): Promise<void> => {
    try {
        const articleToDelete = await Article.findById(data._id).exec();

        if (!articleToDelete) throw new AppError('This article does not exist', 404);
        if (articleToDelete.author.toString() !== currentUser._id.toString())
            throw new AppError('This user cannot delete this article', 403);

        const deleteResult = await Article.deleteOne({ _id: data._id });
        if (deleteResult.deletedCount !== 1)
            throw new AppError('Something went wrong while deleting the article', 500);
    } catch (error) {
        throw error;
    }
};
