import express from 'express';
import products from '../data/Products';
const router = express.Router();

app.get('/', (req, res) => {
  res.json(products);
});

app.get('/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(products);
});

export default router;
