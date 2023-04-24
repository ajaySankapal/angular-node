const express = require('express')
const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../controllers/productController')
const singleUpload = require('../middlewares/multer')

const router = express.Router()

router.route('/create').post(singleUpload, createProduct)
router.route('/all').get(getProducts)
router.route('/:id').put(updateProduct).delete(deleteProduct).get(getProductById)

module.exports = router
