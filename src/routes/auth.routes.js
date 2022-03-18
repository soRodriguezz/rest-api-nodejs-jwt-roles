import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

export default router;