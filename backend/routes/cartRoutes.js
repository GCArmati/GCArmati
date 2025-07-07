const express = require('express');
const {addToCart}=require('../controller/cartController');
const router=express.Router();

router.post('/addToCart',addToCart)




module.exports=router;
