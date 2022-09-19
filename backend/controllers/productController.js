import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import moment from 'moment/moment.js';

//  @desc Fetch All products
//  @route GET /api/products
//  @access public
const getProducts = AsyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('product alredy reviewd');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      create_at: moment().format('lll'),
      update_at: moment().format('lll'),
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

//  @desc   GET Top rated product
//  @route  GET  /api/products/:id/top
//  @access Public

const getTopProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deletedProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
