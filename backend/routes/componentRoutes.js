const express = require('express');
const {createComponent, deleteComponent, getComponentsByCategory} = require('../controller/componentController')
const {adminRoute, verifyToken} = require('../middleware/authMiddleware')

const router = express.Router();

//POST /api/component/create
// only for admin users
//codice per testare verifyToken e protectRoute senza adminRoute
//router.post('/create', verifyToken, createComponent);
router.post('/create',verifyToken, adminRoute ,createComponent);

//DELETE /api/component/delete/:id
//only for admin users
router.delete('/delete/:id', deleteComponent);

//GET /api/component/category/:category
router.get("/category/:category", getComponentsByCategory);

module.exports = router;