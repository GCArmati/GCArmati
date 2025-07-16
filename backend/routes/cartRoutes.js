const express = require('express');
const {addToCart,removeFromCart,getCart,decreaseAmount,increaseAmount}=require('../controller/cartController');
const router=express.Router();
const {verifyToken}=require('../middleware/authMiddleware')

router.post('/addCart', verifyToken, addToCart)

router.post('/remove',verifyToken, removeFromCart)

router.get('/',verifyToken, getCart)

router.post('/decrease',verifyToken, decreaseAmount)

router.post('/increase',verifyToken, increaseAmount)

module.exports=router;
