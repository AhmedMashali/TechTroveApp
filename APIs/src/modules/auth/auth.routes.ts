import { Router } from 'express';
import { registerUser, loginUser, refreshUserToken, logoutUser } from './auth.controller';
import { validateDto } from '../../middlewares/validate-dto.middleware';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { authenticate } from '../../config/passport.config';

const router = Router();

router.post('/register', validateDto(RegisterDto), registerUser);
router.post('/login', validateDto(LoginDto), loginUser);
router.post('/refresh-token', refreshUserToken);
router.post('/logout', authenticate, logoutUser);

export default router;
