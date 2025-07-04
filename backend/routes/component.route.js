import express from 'express';
import {createComponent, deleteComponent, getComponentsByCategory} from '../controllers/component.controller.js'

const router = express.Router();

router.post('/createComponent', createComponent);
router.delete('/:id', deleteComponent);
router.get("/category/:category", getComponentsByCategory);

export default router;