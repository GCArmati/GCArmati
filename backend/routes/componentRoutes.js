const express = require('express');
const {createComponent, deleteComponent, getComponentsByCategory, modifyPrice, getAllComponents} = require('../controller/componentController')
const {adminRoute, verifyToken} = require('../middleware/authMiddleware')

const router = express.Router();

//POST /api/component/create - only Admin
//router.post('/create',verifyToken, adminRoute ,createComponent);
router.post('/create', verifyToken, createComponent);

//DELETE /api/component/delete/:id - only Admin
//router.delete('/delete/:id', verifyToken, adminRoute, deleteComponent);
router.delete('/delete/:id',verifyToken, adminRoute, deleteComponent);

//GET /api/component/getAll
//router.get('/getAll', verifyToken, adminRoute, getAllComponents);
router.get('/getAll', getAllComponents);

//GET /api/component/category/:category
router.get("/category/:category", getComponentsByCategory);

//POST /api/component/modifyprice/:id
//router.post("/modifyprice/:id", verifyToken, adminRoute, modifyPrice);
router.post('/modifyprice/:id',verifyToken, adminRoute, modifyPrice);

module.exports = router;