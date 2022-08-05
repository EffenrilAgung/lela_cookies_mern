import express from 'express';
import AsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
const router = express.Router();

//  @desc Fetch All products
//  @route GET /api/products
//  @access public
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    // const products = await Product.find({});
    const products = await Product.find({
      name: 'Airpods Wireless Bluetooth Headphones',
    }).exec();
    res.json(products);
    console.log(products);
  })
);

// router.get('/', async (req, res, next) => {
//   const product = await Product.find();
//   res.send(product);
//   console.log(product);
// });

//  @desc Fetch single Product
//  @route GET /api/products/:id
//  @access public
router.get(
  '/:id',
  AsyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const product = await Product.findById(req.params.id);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'product not found' });
      }
    }
  })
);

export default router;
