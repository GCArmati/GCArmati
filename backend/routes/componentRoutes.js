const express = require('express');
const {createComponent, deleteComponent, getComponentsByCategory, modifyPrice, getAllComponents} = require('../controller/componentController')
const {verifyToken} = require('../middleware/authMiddleware')

const router = express.Router();


router.post('/create',verifyToken, createComponent);

router.delete('/delete/:id', verifyToken, deleteComponent);

router.get('/getAll', getAllComponents);

router.get("/category/:category", verifyToken, getComponentsByCategory);

router.post("/modifyprice/:id", verifyToken, modifyPrice);


module.exports = router;
