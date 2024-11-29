import { Router } from 'express';
import { body, check, oneOf } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getAllUpdates, getOneUpdate, updateUpdate } from './handlers/update';

const router = Router();

// poroducts
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product/',  body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

// updates
router.get('/update', getAllUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', 
    body('title').optional(), 
    body('body').optional(), 
    oneOf([
        check('status').equals('IN_PROGRESS').optional(), 
        check('status').equals('SHIPPED').optional(), 
        check('status').equals('DEPRECATED').optional()
    ]), 
    body('version').optional(), 
    updateUpdate)
router.post('/update/',
    body('title').exists().isString(), 
    body('body').exists().isString(),
    body('productId').exists().isString(), 
    createUpdate
)
router.delete('/update/:id', deleteUpdate)

// update points
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => {}
)
router.post('/updatepoint/',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => {}
)
router.delete('/updatepoint/:id', () => {})

export default router