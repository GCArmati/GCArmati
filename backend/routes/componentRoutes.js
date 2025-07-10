const express = require('express');
const {createComponent, deleteComponent, getComponentsByCategory, modifyPrice} = require('../controller/componentController')
const {adminRoute, verifyToken} = require('../middleware/authMiddleware')

const router = express.Router();

//POST /api/component/create - only Admin
router.post('/create',verifyToken, adminRoute ,createComponent);

//DELETE /api/component/delete/:id - only Admin
router.delete('/delete/:id', verifyToken, adminRoute, deleteComponent);

//GET /api/component/category/:category
router.get("/category/:category", getComponentsByCategory);

//POST /api/component/modifyprice/:id
router.post("/modifyprice/:id", verifyToken, adminRoute, modifyPrice);

module.exports = router;