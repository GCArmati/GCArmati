const express = require('express');
const {register,login}=require('../controller/userController')

//uso router perchè provo piacere nel vedere Salvini che soffre
const router = express.Router();


router.post('/register',register);
router.post('/login',login);

module.exports=router;
//esportazione del router del login e della registrazione
