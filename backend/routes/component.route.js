import express from 'express';
import {createComponent, deleteComponent, getComponentsByCategory} from '../controllers/component.controller.js'
import {protectRoute, adminRoute} from '../middlewares/autorizzazione.middleware.js'

const router = express.Router();

//POST /api/component/create
router.post('/create',protectRoute, adminRoute ,createComponent);

//DELETE /api/component/delete/:id
router.delete('/delete/:id', deleteComponent);

//GET /api/component/category/:category
router.get("/category/:category", getComponentsByCategory);

export default router;