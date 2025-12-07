const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getSales);
router.get('/filters', salesController.getFilterOptions);
router.get('/:id', salesController.getSaleById);

module.exports = router;