const express = require('express');
const {register,login,refreshToken,logout}=require('../controller/userController')
const {verifyToken} = require("../middleware/authMiddleware")
//uso router perchè provo piacere nel vedere Salvini che soffre
const router = express.Router();

//POST /api/auth/register
//deve contenere username, password, email
router.post('/register',register);

//POST /api/auth/login
//deve contenere email, password
router.post('/login',login);

//POST /api/auth/refresh
//deve contenere req.cookies.jwt=refreshToken
router.post('/refresh',refreshToken);

//POST /api/auth/logout
//per fare logout deve avere un refreshToken valido
//è sufficiente far apparire la funzione di logout solo fin quando persiste il token nel DB (Dragon Ball)
router.post('/logout',verifyToken, logout);


module.exports=router;
//esportazione del router
