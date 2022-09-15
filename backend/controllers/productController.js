import { response } from 'express';
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
    res.status(404);
    throw new Error('product not found');
  }
});

//  @desc   DELETED a product
//  @route  GET /api/products/:id
//  @access Private
const deletedProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//  @desc   Create a product
//  @route  POST /api/products
//  @access Private
const createProduct = AsyncHandler(async (req, res) => {
  //this create a model on database without change on model database
  const product = new Product({
    name: 'sample',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//  @desc   Update a product
//  @route  PUT /api/products/:id
//  @access Private
const updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.status(201).json(updateProduct);
  } else {
    res.status(404);
    throw new Error('product Not Found');
  }
});

//  @desc   Create new review
//  @route  POST /api/products/:id/reviews
//  @access Private
const createProductReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user_id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('product alredy reviewd');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: 'review Added',
    });
  } else {
    res.status(404);
    throw new Error('product Not Found');
  }
});

export {
  getProducts,
  getProductById,
  deletedProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
