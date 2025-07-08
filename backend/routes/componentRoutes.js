const express = require('express');
const {createComponent, deleteComponent, getComponentsByCategory} = require('../controller/componentController')
const {protectRoute, adminRoute} = require('../middleware/authMiddleware')

const router = express.Router();

//POST /api/component/create
router.post('/create',protectRoute, adminRoute ,createComponent);

//DELETE /api/component/delete/:id
router.delete('/delete/:id', deleteComponent);

//GET /api/component/category/:category
router.get("/category/:category", getComponentsByCategory);

module.exports = router;