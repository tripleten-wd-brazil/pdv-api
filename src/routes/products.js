const { Router } = require('express');
const {
  createProduct,
  deleteProduct,
  listProducts,
} = require('../controllers/products');

const router = new Router();

router.get('/', listProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
