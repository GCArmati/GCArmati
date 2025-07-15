const express = require('express');
const {addToCart,removeFromCart,getCart,decreaseAmount,increaseAmount}=require('../controller/cartController');
const router=express.Router();
const {verifyToken}=require('../middleware/authMiddleware')


//richieste con authotization header per verifyToken

//qui serve solo "componentId"
router.post('/addCart', verifyToken, addToCart)

//solo "componentId"
router.post('/remove',verifyToken, removeFromCart)

//qui nella riserva in realtà non serve nulla se non le info provenienti da verifyToken
router.get('/',verifyToken, getCart)

//
router.post('/decrease',verifyToken, decreaseAmount)

//
router.post('/increase',verifyToken, increaseAmount)

module.exports=router;
