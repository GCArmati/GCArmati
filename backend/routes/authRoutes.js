const express = require('express');
const {register,login,refreshToken,logout}=require('../controller/userController')
const {verifyToken}=require('../middleware/authMiddleware')

//uso router perchè provo piacere nel vedere Salvini che soffre
const router = express.Router();

//POST /api/auth/register
router.post('/register',register);

//POST /api/auth/login
router.post('/login',login);

//POST /api/auth/refresh
router.post('/refresh',refreshToken);

//POST /api/auth/logout
router.post('/logout', logout);


module.exports=router;
//esportazione del router
