import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode At Port ${PORT}`.yellow.bold
  )
);
