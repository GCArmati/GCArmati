import express from 'express';
import {register,login,refreshToken,logout} from '../controllers/auth.controller.js'

//uso router perchè provo piacere nel vedere Salvini che soffre
const router = express.Router();

//POST /api/auth/register
router.post('/register',register);

//POST /api/auth/login
router.post('/login',login);

//POST /api/auth/refresh
router.post('/refresh',refreshToken);

//POST /api/auth/logout
router.post('/logout',logout);

export default router;
//esportazione del router