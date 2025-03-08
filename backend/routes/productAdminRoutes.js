const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

//@route GEt /api/admin/products
//@desc Get all products (Admin only)
//@access Private/Admin

router.get('/', protect, admin, async(req,res) =>{
    try {
        const product = await Product.find({});
        res.json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
        
    }
})













module.exports = router;