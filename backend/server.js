import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/Products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});

app.get('/api/products/', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode At Port ${PORT}`.yellow.bold
  )
);
