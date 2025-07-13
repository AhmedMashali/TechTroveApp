import { Router } from 'express';
import authRouter from './auth/auth.routes';
import articleRouter from './articles/article.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articleRouter);

export default router;
