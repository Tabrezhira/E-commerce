const express = require('express');
const Checkout = require('../models/Checkout');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//@route POST /api/orders/my-orders
//@desc Get looged-in user's orders
//@access Private

router.get('/my-orders', protect, async(req,res)=>{
    try {
        //Find orders for the authenticated user
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }); //sort by most recent orders
        res.json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).send('serverError')
    }
})


module.exports = router;