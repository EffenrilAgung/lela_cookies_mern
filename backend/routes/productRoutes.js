import express from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
const router = express.Router();

// router.router('/').get(getProducts);
// router.router('/:id').get(getProductById);
// Mod
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
