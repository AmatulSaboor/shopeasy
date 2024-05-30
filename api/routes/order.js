const express = require('express')
const router = express.Router();
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const mongoose = require('mongoose');
const Product = require('../models/Product');

router.get('/getList/:customerID', async (req, res) => {
    try {
        const orders =  await Order.find({customerEmail : req.params.customerID })
        let orderItems = await Promise.all(orders.map(async (order) => {
            return await OrderItem.find({ orderID: order._id });
          }));
          orderItems = orderItems.flat()
        res.send(JSON.stringify({orders , orderItems}))
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.get('/getList', async (req, res) => {
    try {
        const orders =  await Order.find()
        const orderItems = await OrderItem.find()
        res.send(JSON.stringify({orders , orderItems}))
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.put('/markCompleted/:id', async (req, res) => {
    try {
        const isMarkCompleted = await Order.findByIdAndUpdate(req.params.id,
            {status:'completed'},
            {new: true}
        )
        res.send(JSON.stringify({isMarkCompleted}))
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.post('/add', async (req, res) => {
    console.log('in order')
    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        console.log(req.body)

        // save order
        const orderData = {
            customerID : req.body.customer._id,
            customerName : req.body.customer.name,
            customerEmail : req.body.customer.email,
            customerPhoneNumber : req.body.customer.phoneNumber,
            customerAddressLine1 : `${req.body.customer.houseNumber},  ${req.body.customer.street}`,
            customerAddressLine2 : `${req.body.customer.city}, ${req.body.customer.country}, ${req.body.customer.postalCode}`,
            paymentMethod : req.body.orderSummary.paymentMethod,
            subTotal : req.body.orderSummary.subTotal,
            tax : req.body.orderSummary.tax,
            shippingCharges : req.body.orderSummary.shippingCharges,
            grandTotal : req.body.orderSummary.grandTotal,
        }
        console.log(orderData)
        const order = await Order.create(orderData)

        // save items in order items table
        const orderItemsData = req.body.cart.map(item1 => {
            return {
                orderID: order._id,
                productID: item1.productID,
                productName: item1.productID.name,
                price: item1.productID.price,
                quantity: item1.quantity
            };
        });

        await Promise.all(req.body.cart.map( async (item) => {
            await Product.findByIdAndUpdate(item.productID._id, 
                { $inc: { sold: item.quantity} },
            {new:true})
        }))

        await OrderItem.create(orderItemsData)
        
        // delete items from cart
        await Cart.deleteMany({customerID:req.body.customer.id})

        await session.commitTransaction();
        session.endSession();
        res.status(200).send(JSON.stringify({order}))
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({message:error.message})
    }
})

module.exports = router