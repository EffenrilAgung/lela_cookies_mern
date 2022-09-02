import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//  @desc Fetch All products
//  @route GET /api/products
//  @access public
const getProducts = AsyncHandler(async (req, res) => {
  const product = await Product.find({});

  res.json(product);
});

//  @desc   Fetch single product
//  @route  GET /api/products/:id
//  @access Public
const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'product not found' });
    throw new Error('product not found');
  }
});

export { getProducts, getProductById };
