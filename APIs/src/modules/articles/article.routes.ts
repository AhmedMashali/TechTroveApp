import { Router } from 'express';
import { validateDto } from '../../middlewares/validate-dto.middleware';
import {
    createArticle,
    getArticles,
    getSingleArticle,
    updateArticle,
    deleteArticle
} from './article.controller';
import { CreateArticleDto } from './dto/create-article.dto';
import { authenticate } from '../../config/passport.config';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetSingleArticleDto } from './dto/get-single-article.dto';
import { GetArticleListDto } from './dto/get-article-list.dto';

const router = Router();

router.get('/:_id', validateDto(GetSingleArticleDto, 'params'), getSingleArticle);
router.get('/', validateDto(GetArticleListDto, 'query'), getArticles);

router.use(authenticate);

router.post('/', validateDto(CreateArticleDto), createArticle);
router.patch('/', validateDto(UpdateArticleDto), updateArticle);
router.delete('/:_id', deleteArticle);

export default router;
