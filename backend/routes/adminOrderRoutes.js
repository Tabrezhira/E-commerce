const express = require('express');
const Checkout = require('../models/Checkout');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//@route GET /api/admin/orders
//@desc Get all orders
//@access Private/Admin

router.get('/',protect,admin,async(req,res)=>{
    try {
        const orders = await Order.find({}).populate("user","name email");
        res.json(orders);
    } catch (error) {
        console.error(error)
        res.status(500).send('serverError')
    }
})


//@route PUT /api/admin/orders/:ID
//@desc UPDATE ORDER STATUS
//@access Private/Admin

router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = req.body.status || order.status;
           order.isDelivered = req.body.status  === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() :order.deliveredAt;
            
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(404).json({message:"order not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('serverError')
    }
})

//@route DELETE /api/admin/orders/:id
//@desc Delete an order
//@access Private/Admin

router.delete('/:id', protect, admin, async(req,res) =>{
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            await order.deleteOne();
            res.json({message:"Order removed"})
        }else{
            res.status(404).json({message : "Order not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('serverError')
    }
})



module.exports = router;